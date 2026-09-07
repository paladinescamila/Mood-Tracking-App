import {useAppStore} from '@/stores/app';
import {useProfileForm} from '@/hooks/useProfileForm';
import Input from '@/components/atoms/Input';
import SubTitle from '@/components/atoms/SubTitle';
import Title from '@/components/atoms/Title';
import Window from '@/components/atoms/Window';
import UploadImage from '@/components/molecules/UploadImage';
import Button from '@/components/atoms/Button';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import {updateUser} from '@/firebase/firestore';
import {deleteFile, uploadFile} from '@/firebase/storage';
import {createUserPhotoURL} from '@/utils/createUserPhotoURL';
import {checkPhotoExceedsLimit} from '@/utils/checkPhotoExceedsLimit';

interface SettingsWindowProps {
	onClose?: () => void;
}

export default function SettingsWindow({onClose}: SettingsWindowProps) {
	const {user, setUser} = useAppStore();

	const {form, errors, loading, setErrors, setLoading, onChangeName, onChangePhoto, validate} =
		useProfileForm(user?.name || '');

	const handleSave = async () => {
		if (!validate()) return;

		try {
			setLoading(true);

			if (user) {
				let photoURL = user.photo;

				if (form.photo) {
					if (checkPhotoExceedsLimit(form.photo)) {
						setErrors((prev) => ({...prev, photo: 'Image size exceeds 250KB.'}));
						return;
					}

					photoURL = await uploadFile(form.photo, createUserPhotoURL(user.id, form.photo.name));
				}

				await updateUser(user.id, {name: form.name.trim(), photo: photoURL});

				if (photoURL && user.photo && user.photo !== photoURL) {
					await deleteFile(user.photo);
				}

				setUser({...user, name: form.name.trim(), photo: photoURL});
			}

			onClose?.();
		} catch (error) {
			console.error('Error updating user:', error);
			setErrors((prev) => ({...prev, button: 'Failed to update account. Please try again.'}));
		} finally {
			setLoading(false);
		}
	};

	return (
		<Window
			className='flex flex-col gap-8'
			backgroundClassName='bg-neutral-0'
			onClose={onClose}
			labelledBy='settings-title'>
			<form
				className='flex flex-col gap-8'
				onSubmit={(event) => {
					event.preventDefault();
					void handleSave();
				}}>
				<div className='flex flex-col gap-2'>
					<Title id='settings-title'>Update your profile</Title>
					<SubTitle>Personalize your account with your name and photo.</SubTitle>
				</div>
				<div className='flex flex-col gap-6'>
					<Input
						label='Name'
						placeholder='Jane Appleseed'
						value={form.name}
						onChange={onChangeName}
						error={errors.name}
					/>
					<UploadImage
						value={form.photo}
						onChange={onChangePhoto}
						error={errors.photo}
						url={user?.photo}
					/>
				</div>
				{errors.button && <ErrorMessage error={errors.button} />}
				<Button loading={loading} disabled={loading}>
					Save changes
				</Button>
			</form>
		</Window>
	);
}
