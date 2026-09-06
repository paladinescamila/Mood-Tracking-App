import {useRef, useState} from 'react';
import {MOODS_OPTIONS} from '@/constants/moods';
import {FEELINGS_OPTIONS} from '@/constants/feelings';
import {SLEEP_HOURS_OPTIONS} from '@/constants/sleepHours';
import {addUserMood} from '@/firebase/firestore';
import {useAppStore} from '@/stores/app';
import Window from '@/components/atoms/Window';
import Select from '@/components/molecules/Select';
import MultiSelect from '@/components/molecules/MultiSelect';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import StepsProgress from '@/components/atoms/StepsProgress';
import Button from '@/components/atoms/Button';
import TextArea from '@/components/atoms/TextArea';
import {generateID} from '@/utils/generateID';

interface AddEntryWindowProps {
	onClose?: () => void;
}

export default function AddEntryWindow({onClose}: AddEntryWindowProps) {
	const {user, addMoodEntry} = useAppStore();

	const [step, setStep] = useState<number>(1);
	const [error, setError] = useState<string | null>(null);
	const [saving, setSaving] = useState<boolean>(false);

	const [form, setForm] = useState<MoodEntryForm>({
		mood: null,
		feelings: [],
		journalEntry: '',
		sleepHours: null,
	});

	const onChange = (fields: Partial<typeof form>) => setForm((prev) => ({...prev, ...fields}));

	const buttonRef = useRef<HTMLButtonElement | null>(null);

	const onButtonClick = async () => {
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
			buttonRef.current?.blur();
		} else {
			setSaving(true);

			try {
				const newMoodEntry: MoodEntry = {
					id: generateID(),
					createdAt: new Date().toISOString(),
					mood: form.mood!,
					feelings: form.feelings,
					journalEntry: form.journalEntry,
					sleepHours: form.sleepHours!,
				};

				addMoodEntry(newMoodEntry);

				await addUserMood(user!.id, newMoodEntry);

				onClose?.();
			} catch (error) {
				console.error('Error saving mood entry:', error);
				setError('Failed to save mood entry. Please try again.');
			} finally {
				setSaving(false);
			}
		}
	};

	return (
		<Window className='flex flex-col gap-8' onClose={onClose} labelledBy='add-entry-title'>
			<h1 id='add-entry-title' className='text-preset-3 md:text-preset-2 text-neutral-900'>
				Log your mood
			</h1>
			<StepsProgress progress={step} total={4} />
			{step === 1 && (
				<Select
					label='How was your mood today?'
					options={MOODS_OPTIONS}
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
