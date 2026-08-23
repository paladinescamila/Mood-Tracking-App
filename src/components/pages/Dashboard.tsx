import Logo from '../atoms/Logo';
import ProfileMenu from '../organisms/ProfileMenu';
import Screen from '../atoms/Screen';
import {SAMPLE_USER, SAMPLE_MOOD_ENTRY, SAMPLE_MOOD_ENTRIES} from '@/constants/sampleData';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import {MOODS_DATA} from '@/constants/moods';
import Icon from '../atoms/Icon';
import MoodIcon from '../atoms/MoodIcon';
import {getDateText} from '@/utils/getDateText';
import {FEELINGS_DATA} from '@/constants/feelings';
import Averages from '../organisms/Averages';
import Chart from '../organisms/Chart';

export default function Dashboard() {
	return (
		<Screen className='pt-10 pb-20 gap-8'>
			<header className='flex flex-row gap-16 items-center justify-between w-full'>
				<Logo />
				<ProfileMenu user={SAMPLE_USER} />
			</header>
			<section className='flex flex-col items-center gap-2.5'>
				<h1 className='text-preset-3 text-blue-600'>Hello, {SAMPLE_USER.name}!</h1>
				<h2 className='text-preset-1 text-neutral-900'>How are you feeling today?</h2>
				<p className='text-preset-6 text-neutral-600'>{getDateText(new Date())}</p>
			</section>
			<Button className='self-center'>Log today's mood</Button>

			<section className='grid grid-cols-[670px_1fr] grid-rows-[max-content_1fr] gap-x-8 gap-y-5 mt-8'>
				<Card className='relative min-w-167.5 h-85 overflow-hidden flex flex-col justify-between row-span-2'>
					<div className='flex flex-col'>
						<p className='text-preset-3 opacity-70 text-neutral-900'>I’m feeling</p>
						<p className='text-preset-2 text-neutral-900'>
							{MOODS_DATA[SAMPLE_MOOD_ENTRY.mood].name}
						</p>
					</div>
					<div className='flex flex-col gap-3'>
						<Icon icon='quote' className='w-6 h-6' />
						<p className='text-preset-6-italic text-neutral-900 w-60'>
							When your heart is full, share your light with the world.
						</p>
					</div>
					<MoodIcon
						mood={SAMPLE_MOOD_ENTRY.mood}
						className='absolute w-80 h-80 top-12.5 right-10'
					/>
				</Card>
				<Card className='gap-4'>
					<div className='flex flex-row gap-3'>
						<Icon icon='sleep' className='w-5.5 h-5.5' />
						<p className='text-preset-6 text-neutral-600'>Sleep</p>
					</div>
					<p className='text-preset-3 text-neutral-900'>{SAMPLE_MOOD_ENTRY.sleepHours} hours</p>
				</Card>
				<Card className='gap-4'>
					<div className='flex flex-row gap-3'>
						<Icon icon='reflection' className='w-5.5 h-5.5' />
						<p className='text-preset-6 text-neutral-600'>Reflection of the day</p>
					</div>
					<p className='text-preset-6 text-neutral-900 h-full'>{SAMPLE_MOOD_ENTRY.journalEntry}</p>
					<div className='flex flex-row gap-3 flex-wrap'>
						{SAMPLE_MOOD_ENTRY.feelings.slice(0, 3).map((feeling, index) => (
							<p key={index} className='text-preset-6-italic text-neutral-600'>
								#{FEELINGS_DATA[feeling].name}
							</p>
						))}
					</div>
				</Card>
			</section>

			<section className='flex flex-row gap-8'>
				<Averages mood='neutral' moodTrend='increase' sleepHours='5-6' sleepHoursTrend='decrease' />
				<Chart moods={SAMPLE_MOOD_ENTRIES} />
			</section>
		</Screen>
	);
}
