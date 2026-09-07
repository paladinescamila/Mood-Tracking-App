import {useEffect, useRef, useState} from 'react';
import {addUserMood} from '@/firebase/firestore';
import {useAppStore} from '@/stores/app';
import {generateID} from '@/utils/generateID';

export const useMoodEntryForm = ({onClose}: {onClose?: () => void}) => {
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
	const stepContentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (step === 1) return;

		stepContentRef.current?.querySelector<HTMLElement>('input, textarea, button')?.focus();
	}, [step]);

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
					journalEntry: form.journalEntry.trim(),
					sleepHours: form.sleepHours!,
				};

				await addUserMood(user!.id, newMoodEntry);

				addMoodEntry(newMoodEntry);

				onClose?.();
			} catch (error) {
				console.error('Error saving mood entry:', error);
				setError('Failed to save mood entry. Please try again.');
			} finally {
				setSaving(false);
			}
		}
	};

	return {step, form, error, saving, buttonRef, stepContentRef, onChange, onButtonClick};
};
