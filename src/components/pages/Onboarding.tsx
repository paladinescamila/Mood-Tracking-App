import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppStore} from '@/stores/app';
import {createUser} from '@/firebase/firestore';
import {uploadFile} from '@/firebase/storage';
import NoUser from '@/components/templates/NoUser';
import Button from '@/components/atoms/Button';
import UploadImage from '@/components/molecules/UploadImage';
import Input from '@/components/atoms/Input';
import ErrorMessage from '@/components/atoms/ErrorMessage';

export default function Onboarding() {
	const {authUser, user, setUser} = useAppStore();
	const navigate = useNavigate();

	const [form, setForm] = useState<{name: string; photo: File | null}>({name: '', photo: null});
	const [errors, setErrors] = useState<{name?: string; photo?: string; button?: string}>({});
	const [loading, setLoading] = useState<boolean>(false);

	const onChangeName = (name: string) => {
		setForm((prev) => ({...prev, name}));
		setErrors((prev) => ({...prev, name: undefined}));
	};

	const onChangePhoto = (photo: File | null) => {
		setForm((prev) => ({...prev, photo}));
		setErrors((prev) => ({...prev, photo: undefined}));
	};

	const handleStart = async () => {
		setErrors({});

		const {name, photo} = form;

		if (!name) {
			setErrors((prev) => ({...prev, name: 'Name is required.'}));
			return;
		}

		try {
			setLoading(true);

			if (authUser) {
				const newUser: User = {
					id: authUser.uid,
					name: name.trim(),
					email: authUser.email || '',
					photo: '',
				};

				if (photo) {
					if (photo.size / 1024 > 250) {
						setErrors((prev) => ({...prev, photo: 'Image size exceeds 250KB.'}));
						return;
					}

					newUser.photo = await uploadFile(photo, `users/${newUser.id}/${photo.name}`);
				}

				await createUser(newUser);
				setUser(newUser);
				navigate('/dashboard');
			}
		} catch (error) {
			console.error('Error creating user:', error);
			setErrors((prev) => ({...prev, button: 'Failed to create account. Please try again.'}));
		} finally {
			setLoading(false);
		}
	};

	if (!authUser) {
		navigate('/login');
		return;
	}

	if (user) {
		navigate('/dashboard');
		return;
	}

	return (
		<NoUser
			title='Personalize your experience'
			subtitle='Add your name and a profile picture to make Mood yours.'>
			<form className='flex flex-col gap-8'>
				<div className='flex flex-col gap-6'>
					<Input
						label='Name'
						placeholder='Jane Appleseed'
						value={form.name}
						onChange={onChangeName}
						error={errors.name}
					/>
					<UploadImage value={form.photo} onChange={onChangePhoto} error={errors.photo} />
				</div>

				<div className='flex flex-col gap-3'>
					{errors.button ? <ErrorMessage error={errors.button} /> : null}
					<Button className='w-full' onClick={handleStart} loading={loading} disabled={loading}>
						Start Tracking
					</Button>
				</div>
			</form>
		</NoUser>
	);
}
