import {useState} from 'react';

import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import NoUser from '@/components/templates/NoUser';

export default function Login() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	return (
		<NoUser title='Welcome back!' subtitle=' Log in to continue tracking your mood and sleep.'>
			<form className='flex flex-col gap-5'>
				<Input
					value={email}
					onChange={setEmail}
					label='Email address'
					placeholder='name@mail.com'
				/>

				<Input value={password} onChange={setPassword} label='Password' placeholder='' />
			</form>

			<footer className='flex flex-col gap-5'>
				<Button className='w-full'>Log In</Button>
				<p className='text-preset-6-regular text-neutral-600 text-center'>
					Haven't got an account?{' '}
					<a href='/signup' className='text-blue-600'>
						Sign up.
					</a>
				</p>
			</footer>
		</NoUser>
	);
}
