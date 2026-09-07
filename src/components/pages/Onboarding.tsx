import {Navigate, useNavigate} from 'react-router-dom';
import {useAppStore} from '@/stores/app';
import {useProfileForm} from '@/hooks/useProfileForm';
import {uploadFile} from '@/firebase/storage';
import {createUserPhotoURL} from '@/utils/createUserPhotoURL';
import {createUser} from '@/firebase/firestore';
import NoUser from '@/components/templates/NoUser';
import Button from '@/components/atoms/Button';
import UploadImage from '@/components/molecules/UploadImage';
import Input from '@/components/atoms/Input';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import {checkPhotoExceedsLimit} from '@/utils/checkPhotoExceedsLimit';

export default function Onboarding() {
	const {authUser, user, setUser} = useAppStore();
	const navigate = useNavigate();

	const {form, errors, loading, setErrors, setLoading, onChangeName, onChangePhoto, validate} =
		useProfileForm();

	const handleStart = async () => {
		if (!validate()) return;

		try {
			setLoading(true);

			if (authUser) {
				const newUser: User = {
					id: authUser.uid,
					name: form.name.trim(),
					email: authUser.email || '',
					photo: '',
				};

				if (form.photo) {
					if (checkPhotoExceedsLimit(form.photo)) {
						setErrors((prev) => ({...prev, photo: 'Image size exceeds 250KB.'}));
						return;
					}

					newUser.photo = await uploadFile(
						form.photo,
						createUserPhotoURL(newUser.id, form.photo.name),
					);
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
		return <Navigate replace to='/login' />;
	}

	if (user) {
		return <Navigate replace to='/dashboard' />;
	}

	return (
		<NoUser
			title='Personalize your experience'
			subtitle='Add your name and a profile picture to make Mood yours.'>
			<form
				id='onboarding-form'
				className='flex flex-col gap-8'
				onSubmit={(event) => {
					event.preventDefault();
					void handleStart();
				}}>
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
					<Button form='onboarding-form' className='w-full' loading={loading} disabled={loading}>
						Start Tracking
					</Button>
				</div>
			</form>
		</NoUser>
	);
}
