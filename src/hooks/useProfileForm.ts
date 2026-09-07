import {useState} from 'react';

export const MAX_PROFILE_PHOTO_SIZE_KB = 250;

export interface ProfileForm {
	name: string;
	photo: File | null;
}

export interface ProfileFormErrors {
	name?: string;
	photo?: string;
	button?: string;
}

export const useProfileForm = (initialName = '') => {
	const [form, setForm] = useState<ProfileForm>({name: initialName, photo: null});
	const [errors, setErrors] = useState<ProfileFormErrors>({});
	const [loading, setLoading] = useState(false);

	const onChangeName = (name: string) => {
		setForm((previous) => ({...previous, name}));
		setErrors((previous) => ({...previous, name: undefined}));
	};

	const onChangePhoto = (photo: File | null) => {
		setForm((previous) => ({...previous, photo}));
		setErrors((previous) => ({...previous, photo: undefined}));
	};

	const validate = () => {
		const nextErrors: ProfileFormErrors = {};

		if (!form.name.trim()) nextErrors.name = 'Name is required.';
		if (form.photo && form.photo.size / 1024 > MAX_PROFILE_PHOTO_SIZE_KB) {
			nextErrors.photo = `Image size exceeds ${MAX_PROFILE_PHOTO_SIZE_KB}KB.`;
		}

		setErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	};

	return {
		form,
		errors,
		loading,
		setErrors,
		setLoading,
		onChangeName,
		onChangePhoto,
		validate,
	};
};
