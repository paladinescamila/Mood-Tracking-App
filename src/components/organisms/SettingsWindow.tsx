import {useEffect, useState} from 'react';
import {useAppStore} from '@/stores/app';
import {updateUser} from '@/firebase/firestore';
import {uploadFile, deleteFile} from '@/firebase/storage';
import {createUserPhotoURL} from '@/utils/createUserPhotoURL';
import {createFileFromURL} from '@/utils/createFileFromURL';
import Input from '@/components/atoms/Input';
import SubTitle from '@/components/atoms/SubTitle';
import Title from '@/components/atoms/Title';
import Window from '@/components/atoms/Window';
import UploadImage from '@/components/molecules/UploadImage';
import Button from '@/components/atoms/Button';

interface SettingsWindowProps {
	onClose?: () => void;
}

export default function SettingsWindow({onClose}: SettingsWindowProps) {
	const {user, setUser} = useAppStore();

	const [form, setForm] = useState<{name: string; photo: File | null}>({
		name: user?.name || '',
		photo: null,
	});

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

	useEffect(() => {
		const fetchUserPhoto = async (url: string) => {
			try {
				const file = await createFileFromURL(url, 'profile-photo');
				setForm((prev) => ({...prev, photo: file}));
			} catch (error) {
				console.error('Error fetching user photo:', error);
			}
		};

		if (user?.photo && !form.photo) {
			fetchUserPhoto(user.photo);
		}
	}, [user?.photo, form.photo]);

	const handleSave = async () => {
		setErrors({});

		const {name, photo} = form;

		if (!name) {
			setErrors((prev) => ({...prev, name: 'Name is required.'}));
			return;
		}

		try {
			setLoading(true);

			let photoURL;

			if (user) {
				if (photo) {
					if (photo.size / 1024 > 250) {
						setErrors((prev) => ({...prev, photo: 'Image size exceeds 250KB.'}));
						return;
					}

					if (user.photo) {
						await deleteFile(user.photo);
					}

					photoURL = await uploadFile(photo, createUserPhotoURL(user.id, photo.name));
				}

				await updateUser(user.id, {name: name.trim(), photo: photoURL});
				setUser({...user, name: name.trim(), photo: photoURL});
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
		<Window className='flex flex-col gap-8' backgroundClassName='bg-neutral-0' onClose={onClose}>
			<div className='flex flex-col gap-2'>
				<Title>Update your profile</Title>
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
				<UploadImage value={form.photo} onChange={onChangePhoto} error={errors.photo} />
			</div>
			<Button onClick={handleSave} loading={loading} disabled={loading}>
				Save changes
			</Button>
		</Window>
	);
}
