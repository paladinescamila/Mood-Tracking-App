import {Link, Navigate, useNavigate} from 'react-router-dom';
import {useAppStore} from '@/stores/app';
import {signUp, signIn} from '@/firebase/auth';
import {getUserByEmail} from '@/firebase/firestore';
import NoUser from '@/components/templates/NoUser';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import {useAuthForm} from '@/hooks/useAuthForm';

export default function Signup() {
	const {user, setUser, setAuthUser} = useAppStore();
	const navigate = useNavigate();

	const {form, errors, loading, setErrors, setLoading, onChangeEmail, onChangePassword, validate} =
		useAuthForm();

	const handleSignup = async () => {
		if (!validate(true)) return;

		const {email, password} = form;

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
		return <Navigate replace to='/dashboard' />;
	}

	return (
		<NoUser title='Create an account' subtitle='Join to track your daily mood and sleep with ease.'>
			<form
				id='signup-form'
				className='flex flex-col gap-5'
				onSubmit={(event) => {
					event.preventDefault();
					void handleSignup();
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
					<Button form='signup-form' className='w-full' loading={loading} disabled={loading}>
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
