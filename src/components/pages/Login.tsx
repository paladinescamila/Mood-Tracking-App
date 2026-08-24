import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppStore} from '@/stores/app';
import {signIn} from '@/firebase/auth';
import {getUser} from '@/firebase/firestore';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import NoUser from '@/components/templates/NoUser';
import ErrorMessage from '@/components/atoms/ErrorMessage';

export default function Login() {
	const [form, setForm] = useState<{email: string; password: string}>({email: '', password: ''});
	const [errors, setErrors] = useState<{email?: string; password?: string; button?: string}>({});

	const {user, setUser, setAuthUser} = useAppStore();
	const navigate = useNavigate();

	const onChangeEmail = (email: string) => {
		setForm((prev) => ({...prev, email}));
		setErrors((prev) => ({...prev, email: undefined}));
	};

	const onChangePassword = (password: string) => {
		setForm((prev) => ({...prev, password}));
		setErrors((prev) => ({...prev, password: undefined}));
	};

	const handleLogin = async () => {
		setErrors({});
		const {email, password} = form;

		if (!email) {
			setErrors((prev) => ({...prev, email: 'Email is required.'}));
			return;
		}

		if (!password) {
			setErrors((prev) => ({...prev, password: 'Password is required.'}));
			return;
		}

		try {
			const authUser = await signIn(email, password);
			const firestoreUser = await getUser(authUser.uid);

			if (firestoreUser) {
				setUser(await getUser(authUser.uid));
				navigate('/dashboard');
			} else {
				setAuthUser(authUser);
				navigate('/onboarding');
			}
		} catch (error) {
			if (
				typeof error === 'object' &&
				error !== null &&
				'code' in error &&
				error.code === 'auth/invalid-credential'
			) {
				setErrors((prev) => ({...prev, button: 'Invalid email or password. Please try again.'}));
			} else {
				console.error('Error signing in:', error);
				setErrors((prev) => ({...prev, button: 'Failed to sign in. Please try again.'}));
			}
		}
	};

	if (user) {
		navigate('/dashboard');
		return;
	}

	return (
		<NoUser title='Welcome back!' subtitle=' Log in to continue tracking your mood and sleep.'>
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
					<Button className='w-full' onClick={handleLogin}>
						Log In
					</Button>
				</div>
				<p className='text-preset-6-regular text-neutral-600 text-center'>
					Haven't got an account?{' '}
					<Link to='/signup' className='text-blue-600 custom-outline rounded-md'>
						Sign up.
					</Link>
				</p>
			</footer>
		</NoUser>
	);
}
