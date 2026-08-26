import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppStore} from '@/stores/app';
import {checkEmail} from '@/utils/checkEmail';
import {signUp, signIn} from '@/firebase/auth';
import {getUserByEmail} from '@/firebase/firestore';
import NoUser from '@/components/templates/NoUser';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ErrorMessage from '@/components/atoms/ErrorMessage';

export default function Signup() {
	const {user, setUser, setAuthUser} = useAppStore();
	const navigate = useNavigate();

	const [form, setForm] = useState<{email: string; password: string}>({email: '', password: ''});
	const [errors, setErrors] = useState<{email?: string; password?: string; button?: string}>({});
	const [loading, setLoading] = useState<boolean>(false);

	const onChangeEmail = (email: string) => {
		setForm((prev) => ({...prev, email}));
		setErrors((prev) => ({...prev, email: undefined}));
	};

	const onChangePassword = (password: string) => {
		setForm((prev) => ({...prev, password}));
		setErrors((prev) => ({...prev, password: undefined}));
	};

	const handleSignup = async () => {
		setErrors({});

		const {email, password} = form;

		if (!email) {
			setErrors((prev) => ({...prev, email: 'Email is required.'}));
			return;
		}

		if (!checkEmail(email)) {
			setErrors((prev) => ({...prev, email: 'Invalid email format.'}));
			return;
		}

		if (!password) {
			setErrors((prev) => ({...prev, password: 'Password is required.'}));
			return;
		}

		try {
			setLoading(true);

			const authUser = await signUp(email, password);

			setAuthUser(authUser);
			navigate('/onboarding');
		} catch (error: unknown) {
			if (
				typeof error === 'object' &&
				error !== null &&
				'code' in error &&
				error.code === 'auth/email-already-in-use'
			) {
				const firestoreUser = await getUserByEmail(email);

				if (firestoreUser) {
					const authUser = await signIn(email, password);

					setAuthUser(authUser);
					setUser(firestoreUser);
					navigate('/dashboard');
				} else {
					const authUser = await signIn(email, password);

					setAuthUser(authUser);
					navigate('/onboarding');
				}
			}

			console.error('Error creating user:', error);
			setErrors((prev) => ({...prev, button: 'Failed to create account. Please try again.'}));
		} finally {
			setLoading(false);
		}
	};

	if (user) {
		navigate('/dashboard');
		return;
	}

	return (
		<NoUser title='Create an account' subtitle='Join to track your daily mood and sleep with ease.'>
			<form className='flex flex-col gap-5'>
				<Input
					label='Email address'
					placeholder='name@mail.com'
					value={form.email}
					onChange={onChangeEmail}
					error={errors.email}
					type='email'
				/>
				<Input
					label='Password'
					value={form.password}
					onChange={onChangePassword}
					error={errors.password}
					type='password'
				/>
			</form>
			<footer className='flex flex-col gap-5'>
				<div className='flex flex-col gap-3'>
					{errors.button ? <ErrorMessage error={errors.button} /> : null}
					<Button className='w-full' onClick={handleSignup} loading={loading} disabled={loading}>
						Sign Up
					</Button>
				</div>
				<p className='text-preset-6-regular text-neutral-600 text-center'>
					Already got an account?{' '}
					<Link to='/' className='text-blue-600 custom-outline rounded-md'>
						Log in.
					</Link>
				</p>
			</footer>
		</NoUser>
	);
}
