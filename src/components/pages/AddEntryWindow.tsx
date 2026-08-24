import {useState} from 'react';
import {MOODS_OPTIONS} from '@/constants/moods';
import {FEELINGS_OPTIONS} from '@/constants/feelings';
import {SLEEP_HOURS_OPTIONS} from '@/constants/sleepHours';
import Window from '@/components/atoms/Window';
import Select from '@/components/molecules/Select';
import MultiSelect from '@/components/molecules/MultiSelect';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import StepsProgress from '@/components/atoms/StepsProgress';
import Button from '@/components/atoms/Button';
import TextArea from '@/components/atoms/TextArea';

export default function AddEntryWindow() {
	const [step, setStep] = useState<number>(1);

	const [form, setForm] = useState<MoodEntryForm>({
		mood: null,
		feelings: [],
		journalEntry: '',
		sleepHours: null,
	});

	const onChange = (fields: Partial<typeof form>) => {
		setForm((prev) => ({...prev, ...fields}));
	};

	const [error, setError] = useState<string | null>(null);

	const onButtonClick = () => {
		if (step === 1 && !form.mood) {
			setError('Please select a mood before continuing.');
			return;
		} else if (step === 2 && form.feelings.length === 0) {
			setError('Please select at least one feeling before continuing.');
			return;
		} else if (step === 2 && form.feelings.length > 3) {
			setError('You can only select a maximum of 3 tags.');
			return;
		} else if (step === 3 && form.journalEntry.trim() === '') {
			setError('Please write a few words about your day before continuing.');
			return;
		} else if (step === 4 && form.sleepHours === null) {
			setError('Please enter the number of hours you slept before continuing.');
			return;
		}

		if (step < 4) {
			setError(null);
			setStep((prev) => prev + 1);
		} else {
			console.log(form);
		}
	};

	return (
		<Window className='flex flex-col gap-8'>
			<h1 className='text-preset-3 md:text-preset-2 text-neutral-900'>Log your mood</h1>
			<StepsProgress progress={step} total={4} />
			{step === 1 && (
				<Select
					label='How was your mood today?'
					value={form.mood}
					onChange={(mood) => onChange({mood})}
					options={MOODS_OPTIONS}
				/>
			)}
			{step === 2 && (
				<MultiSelect
					label='How did you feel?'
					description='Select up to three tags:'
					value={form.feelings}
					onChange={(feelings) => onChange({feelings})}
					options={FEELINGS_OPTIONS}
				/>
			)}
			{step === 3 && (
				<TextArea
					label='Write about your day...'
					value={form.journalEntry}
					onChange={(journalEntry) => onChange({journalEntry})}
					limit={150}
				/>
			)}
			{step === 4 && (
				<Select
					label='How many hours did you sleep last night?'
					value={form.sleepHours}
					onChange={(sleepHours) => onChange({sleepHours})}
					options={SLEEP_HOURS_OPTIONS}
				/>
			)}
			<div className='flex flex-col gap-4'>
				{error ? <ErrorMessage error={error} /> : null}

				<Button className='w-full' onClick={onButtonClick}>
					{step < 4 ? 'Continue' : 'Submit'}
				</Button>
			</div>
		</Window>
	);
}
