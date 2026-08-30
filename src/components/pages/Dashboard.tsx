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
import AddEntryWindow from '@/components/organisms/AddEntryWindow';
import TodaysMood from '@/components/organisms/TodaysMood';
import {useLoadData} from '@/hooks/useLoadData';
import {useTodaysMood} from '@/hooks/useTodaysMood';

export default function Dashboard() {
	const {user} = useAppStore();
	const {todaysMood} = useTodaysMood();
	const [showAddEntryWindow, setShowAddEntryWindow] = useState<boolean>(false);

	useLoadData();

	const navigate = useNavigate();

	if (!user) {
		navigate('/login');
		return;
	}

	return (
		<Screen className='pt-10 pb-20 gap-8 xl:px-8 2xl:px-33!'>
			<header className='flex flex-row gap-16 items-center justify-between w-full'>
				<Logo />
				<ProfileMenu user={user} />
			</header>
			<section className='flex flex-col items-center gap-2.5'>
				<h1 className='text-preset-3-mobile md:text-preset-3 text-blue-600 text-center'>
					Hello, {user.name.split(' ')[0]}!
				</h1>
				<h2 className='text-preset-1-mobile md:text-preset-1 text-neutral-900 text-center'>
					How are you feeling today?
				</h2>
				<p className='text-preset-6 text-neutral-600'>{getDateText(new Date())}</p>
			</section>

			{todaysMood ? (
				<TodaysMood />
			) : (
				<Button className='self-center' onClick={() => setShowAddEntryWindow(true)}>
					Log today's mood
				</Button>
			)}

			<section className='flex flex-col xl:flex-row gap-8'>
				<Averages />
				<Chart />
			</section>

			{showAddEntryWindow && <AddEntryWindow onClose={() => setShowAddEntryWindow(false)} />}
		</Screen>
	);
}
