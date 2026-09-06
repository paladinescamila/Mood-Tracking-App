import {Link, Navigate, useNavigate} from 'react-router-dom';
import {useAppStore} from '@/stores/app';
import {signIn} from '@/firebase/auth';
import {getUser} from '@/firebase/firestore';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import NoUser from '@/components/templates/NoUser';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import {useAuthForm} from '@/hooks/useAuthForm';

export default function Login() {
	const {user, setUser, setAuthUser} = useAppStore();
	const navigate = useNavigate();

	const {form, errors, loading, setErrors, setLoading, onChangeEmail, onChangePassword, validate} =
		useAuthForm();

	const handleLogin = async () => {
		if (!validate()) return;

		const {email, password} = form;

		try {
			setLoading(true);

			const authUser = await signIn(email, password);
			const firestoreUser = await getUser(authUser.uid);

			if (firestoreUser) {
				setUser(firestoreUser);
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
		} finally {
			setLoading(false);
		}
	};

	if (user) {
		return <Navigate replace to='/dashboard' />;
	}

	return (
		<NoUser title='Welcome back!' subtitle=' Log in to continue tracking your mood and sleep.'>
			<form
				id='login-form'
				className='flex flex-col gap-5'
				onSubmit={(event) => {
					event.preventDefault();
					void handleLogin();
				}}>
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
					<Button form='login-form' className='w-full' loading={loading} disabled={loading}>
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
