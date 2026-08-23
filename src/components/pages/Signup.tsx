import {useState} from 'react';

import NoUser from '../templates/NoUser';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

export default function Signup() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	return (
		<NoUser title='Create an account' subtitle='Join to track your daily mood and sleep with ease.'>
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
				<Button className='w-full'>Sign Up</Button>
				<p className='text-preset-6-regular text-neutral-600 text-center'>
					Already got an account?{' '}
					<a href='/login' className='text-blue-600'>
						Log in.
					</a>
				</p>
			</footer>
		</NoUser>
	);
}
