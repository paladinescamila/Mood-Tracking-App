import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppStore} from '@/stores/app';
import {createUser} from '@/firebase/firestore';
import NoUser from '@/components/templates/NoUser';
import Button from '@/components/atoms/Button';
import UploadImage from '@/components/molecules/UploadImage';
import Input from '@/components/atoms/Input';
import ErrorMessage from '@/components/atoms/ErrorMessage';

export default function Onboarding() {
	const [form, setForm] = useState<{name: string; photo: File | null}>({name: '', photo: null});
	const [errors, setErrors] = useState<{name?: string; photo?: string; button?: string}>({});

	const {authUser, user, setUser} = useAppStore();
	const navigate = useNavigate();

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
		const {name} = form;

		console.log('authUser:', authUser);

		if (!name) {
			setErrors((prev) => ({...prev, name: 'Name is required.'}));
			return;
		}

		console.log('authUser:', authUser);

		try {
			if (authUser) {
				const newUser: User = {
					id: authUser.uid,
					name: form.name.trim(),
					email: authUser.email || '',
					photo: '',
				};

				console.log('Creating user:', newUser);

				createUser(newUser);
				setUser(newUser);
				navigate('/dashboard');
			}
		} catch (error) {
			console.error('Error creating user:', error);
			setErrors((prev) => ({...prev, button: 'Failed to create account. Please try again.'}));
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
					<Button className='w-full' onClick={handleStart}>
						Start Tracking
					</Button>
				</div>
			</form>
		</NoUser>
	);
}
