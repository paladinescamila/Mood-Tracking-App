import {useState} from 'react';
import {checkEmail} from '@/utils/checkEmail';

type AuthFormErrors = {
	email?: string;
	password?: string;
	button?: string;
};

export const useAuthForm = () => {
	const [form, setForm] = useState<{email: string; password: string}>({email: '', password: ''});
	const [errors, setErrors] = useState<AuthFormErrors>({});
	const [loading, setLoading] = useState<boolean>(false);

	const onChangeEmail = (email: string) => {
		setForm((previous) => ({...previous, email}));
		setErrors((previous) => ({...previous, email: undefined}));
	};

	const onChangePassword = (password: string) => {
		setForm((previous) => ({...previous, password}));
		setErrors((previous) => ({...previous, password: undefined}));
	};

	const validate = (validateEmail = false) => {
		setErrors({});

		if (!form.email) {
			setErrors((previous) => ({...previous, email: 'Email is required.'}));
			return false;
		}

		if (validateEmail && !checkEmail(form.email)) {
			setErrors((previous) => ({...previous, email: 'Invalid email format.'}));
			return false;
		}

		if (!form.password) {
			setErrors((previous) => ({...previous, password: 'Password is required.'}));
			return false;
		}

		return true;
	};

	return {
		form,
		errors,
		loading,
		setErrors,
		setLoading,
		onChangeEmail,
		onChangePassword,
		validate,
	};
};
