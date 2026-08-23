import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import MoodIcon from '@/components/atoms/MoodIcon';
import ProfilePicture from '@/components/atoms/ProfilePicture';
import StepsProgress from '@/components/atoms/StepsProgress';
import Tag from '@/components/atoms/Tag';
import './index.css';

function App() {
	return (
		<>
			<Icon icon='quote' />
			<MoodIcon mood='happy' mode='color' />
			<Input label='Name' value='' onChange={() => {}} placeholder='name@mail.com' />
			<Button type='primary'>Click me</Button>
			<Button type='secondary' disabled>
				Click me
			</Button>
			<Tag name='Tag' size='small' checkStyle='square' />
			<Tag name='Tag' size='small' checkStyle='square' checked />
			<Tag name='Tag' size='normal' checkStyle='circle' />
			<Tag name='Tag' size='normal' checkStyle='circle' checked />
			<StepsProgress progress={1} total={4} />
			<ProfilePicture />
		</>
	);
}

export default App;
