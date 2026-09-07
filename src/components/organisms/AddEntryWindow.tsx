import {MOODS, MOODS_DATA} from '@/constants/moods';
import {FEELINGS_OPTIONS} from '@/constants/feelings';
import {SLEEP_HOURS_OPTIONS} from '@/constants/sleepHours';
import MoodIcon from '@/components/atoms/MoodIcon';
import Window from '@/components/atoms/Window';
import Select from '@/components/molecules/Select';
import MultiSelect from '@/components/molecules/MultiSelect';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import StepsProgress from '@/components/atoms/StepsProgress';
import Button from '@/components/atoms/Button';
import TextArea from '@/components/atoms/TextArea';
import {useMoodEntryForm} from '@/hooks/useMoodEntryForm';

interface AddEntryWindowProps {
	onClose?: () => void;
}

export default function AddEntryWindow({onClose}: AddEntryWindowProps) {
	const {step, form, error, saving, buttonRef, stepContentRef, onChange, onButtonClick} =
		useMoodEntryForm({onClose});

	return (
		<Window className='flex flex-col gap-8' onClose={onClose} labelledBy='add-entry-title'>
			<h1 id='add-entry-title' className='text-preset-3 md:text-preset-2 text-neutral-900'>
				Log your mood
			</h1>
			<StepsProgress progress={step} total={4} />
			<div ref={stepContentRef}>
				{step === 1 && (
					<Select
						label='How was your mood today?'
						options={MOODS.map((mood) => ({
							label: MOODS_DATA[mood].name,
							value: mood,
							icon: <MoodIcon mood={mood} className='w-9 h-9' />,
						}))}
						value={form.mood}
						onChange={(mood) => onChange({mood})}
					/>
				)}
				{step === 2 && (
					<MultiSelect
						label='How did you feel?'
						description='Select up to three tags:'
						options={FEELINGS_OPTIONS}
						value={form.feelings}
						onChange={(feelings) => onChange({feelings})}
					/>
				)}
				{step === 3 && (
					<TextArea
						label='Write about your day...'
						placeholder='Today, I felt...'
						value={form.journalEntry}
						onChange={(journalEntry) => onChange({journalEntry})}
						limit={150}
					/>
				)}
				{step === 4 && (
					<Select
						label='How many hours did you sleep last night?'
						options={SLEEP_HOURS_OPTIONS}
						value={form.sleepHours}
						onChange={(sleepHours) => onChange({sleepHours})}
					/>
				)}
			</div>
			<div className='flex flex-col gap-4'>
				{error ? <ErrorMessage error={error} /> : null}
				<Button
					className='w-full'
					onClick={onButtonClick}
					loading={saving}
					disabled={saving}
					ref={buttonRef}>
					{step < 4 ? 'Continue' : 'Submit'}
				</Button>
			</div>
		</Window>
	);
}
