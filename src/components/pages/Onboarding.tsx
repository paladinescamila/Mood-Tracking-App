import {useState} from 'react';
import NoUser from '@/components/templates/NoUser';
import Button from '@/components/atoms/Button';
import UploadImage from '@/components/molecules/UploadImage';
import Input from '@/components/atoms/Input';

export default function Onboarding() {
	const [name, setName] = useState<string>('');
	const [photo, setPhoto] = useState<File | null>(null);

	return (
		<NoUser
			title='Personalize your experience'
			subtitle='Add your name and a profile picture to make Mood yours.'>
			<form className='flex flex-col gap-8'>
				<div className='flex flex-col gap-6'>
					<Input label='Name' placeholder='Jane Appleseed' value={name} onChange={setName} />
					<UploadImage value={photo} onChange={setPhoto} />
				</div>

				<Button className='w-full'>Start Tracking</Button>
			</form>
		</NoUser>
	);
}
