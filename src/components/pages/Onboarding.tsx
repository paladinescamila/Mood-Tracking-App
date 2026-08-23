import {useState} from 'react';
import NoUser from '../templates/NoUser';
import Button from '../atoms/Button';
import UploadImage from '../molecules/UploadImage';
import Input from '../atoms/Input';

export default function Onboarding() {
	const [name, setName] = useState<string>('');
	const [photo, setPhoto] = useState<File | null>(null);

	return (
		<NoUser
			title='Personalize your experience'
			subtitle='Add your name and a profile picture to make Mood yours.'>
			<form className='flex flex-col gap-8'>
				<div className='flex flex-col gap-6'>
					<Input value={name} onChange={setName} label='Name' placeholder='Jane Appleseed' />
					<UploadImage value={photo} onChange={setPhoto} />
				</div>

				<Button className='w-full'>Start Tracking</Button>
			</form>
		</NoUser>
	);
}
