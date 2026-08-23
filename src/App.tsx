import './index.css';

import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import MoodIcon from '@/components/atoms/MoodIcon';
import ProfilePicture from '@/components/atoms/ProfilePicture';
import StepsProgress from '@/components/atoms/StepsProgress';
import Tag from '@/components/atoms/Tag';
import Card from '@/components/atoms/Card';
import TextArea from '@/components/atoms/TextArea';
import UploadImage from '@/components/molecules/UploadImage';
import Select from '@/components/molecules/Select';
import MultiSelect from '@/components/molecules/MultiSelect';
import {MOODS_OPTIONS} from '@/constants/moods';

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
			<Card>Hola</Card>
			<TextArea
				label='Write about your day...'
				value=''
				onChange={() => {}}
				aria-placeholder='Today I felt...'
				limit={150}
			/>
			<UploadImage value={null} onChange={() => {}} />
			<Select
				value='sad'
				onChange={() => {}}
				options={MOODS_OPTIONS}
				label='How was your mood today?'
			/>
			<MultiSelect
				value={['happy']}
				onChange={() => {}}
				options={MOODS_OPTIONS}
				label='How was your mood today?'
				description='Select the mood that best describes your day.'
			/>
		</>
	);
}

export default App;
