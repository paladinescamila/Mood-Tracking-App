import {useState} from 'react';
import {useAppStore} from '@/stores/app';
import {useNavigate} from 'react-router-dom';
import Logo from '@/components/atoms/Logo';
import ProfileMenu from '@/components/organisms/ProfileMenu';
import Screen from '@/components/atoms/Screen';
import Button from '@/components/atoms/Button';
import {getDateText} from '@/utils/getDateText';
import Averages from '@/components/organisms/Averages';
import Chart from '@/components/organisms/Chart';
import AddEntryWindow from '@/components/pages/AddEntryWindow';
import {addUserMood} from '@/firebase/firestore';
import TodaysMood from '@/components/organisms/TodaysMood';
import {useLoadData} from '@/hooks/useLoadData';

export default function Dashboard() {
	const [showAddEntryWindow, setShowAddEntryWindow] = useState<boolean>(false);

	const {user, todaysMood, setTodaysMood, addMoodEntry} = useAppStore();

	const onSubmitNewMoodEntry = (newMoodEntry: MoodEntry) => {
		addUserMood(user!.id, newMoodEntry);

		setTodaysMood(newMoodEntry);
		addMoodEntry(newMoodEntry);

		setShowAddEntryWindow(false);
	};

	useLoadData();

	const navigate = useNavigate();

	if (!user) {
		navigate('/login');
		return;
	}

	return (
		<Screen className='pt-10 pb-20 gap-8'>
			<header className='flex flex-row gap-16 items-center justify-between w-full'>
				<Logo />
				<ProfileMenu user={user} />
			</header>
			<section className='flex flex-col items-center gap-2.5'>
				<h1 className='text-preset-3 text-blue-600'>Hello, {user.name}!</h1>
				<h2 className='text-preset-1 text-neutral-900'>How are you feeling today?</h2>
				<p className='text-preset-6 text-neutral-600'>{getDateText(new Date())}</p>
			</section>

			{todaysMood ? (
				<TodaysMood />
			) : (
				<Button className='self-center' onClick={() => setShowAddEntryWindow(true)}>
					Log today's mood
				</Button>
			)}

			<section className='flex flex-row gap-8'>
				<Averages />
				<Chart />
			</section>

			{showAddEntryWindow && (
				<AddEntryWindow
					onSubmit={onSubmitNewMoodEntry}
					onClose={() => setShowAddEntryWindow(false)}
				/>
			)}
		</Screen>
	);
}
