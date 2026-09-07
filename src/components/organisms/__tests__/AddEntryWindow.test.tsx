import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import AddEntryWindow from '@/components/organisms/AddEntryWindow';
import {addUserMood} from '@/firebase/firestore';
import {useAppStore} from '@/stores/app';

vi.mock('@/firebase/firestore', () => ({
	addUserMood: vi.fn(),
}));

vi.mock('@/stores/app', () => ({
	useAppStore: vi.fn(),
}));

vi.mock('@/components/atoms/Window', () => ({
	default: ({children}: {children: React.ReactNode}) => <div role='dialog'>{children}</div>,
}));

const mockedAddUserMood = vi.mocked(addUserMood);
const mockedUseAppStore = vi.mocked(useAppStore);

const user: User = {
	id: 'user-1',
	name: 'Jane Appleseed',
	email: 'jane@example.com',
	photo: '',
};

describe('AddEntryWindow', () => {
	const addMoodEntry = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		mockedAddUserMood.mockResolvedValue(undefined);
		mockedUseAppStore.mockReturnValue({user, addMoodEntry} as never);
	});

	it('submits a complete four-step mood entry', async () => {
		const onClose = vi.fn();
		render(<AddEntryWindow onClose={onClose} />);

		fireEvent.click(screen.getByRole('radio', {name: /Very Happy/}));
		fireEvent.click(screen.getByRole('button', {name: 'Continue'}));

		fireEvent.click(screen.getByRole('checkbox', {name: 'Joyful'}));
		fireEvent.click(screen.getByRole('button', {name: 'Continue'}));

		fireEvent.change(screen.getByLabelText('Write about your day...'), {
			target: {value: 'I had a productive day.'},
		});
		fireEvent.click(screen.getByRole('button', {name: 'Continue'}));

		fireEvent.click(screen.getByRole('radio', {name: /7-8 hours/}));
		fireEvent.click(screen.getByRole('button', {name: 'Submit'}));

		await waitFor(() => expect(mockedAddUserMood).toHaveBeenCalledOnce());

		expect(mockedAddUserMood).toHaveBeenCalledWith(
			'user-1',
			expect.objectContaining({
				mood: 'very-happy',
				feelings: ['joyful'],
				journalEntry: 'I had a productive day.',
				sleepHours: '7-8',
			}),
		);
		expect(addMoodEntry).toHaveBeenCalledWith(
			expect.objectContaining({
				mood: 'very-happy',
				feelings: ['joyful'],
				journalEntry: 'I had a productive day.',
				sleepHours: '7-8',
			}),
		);
		expect(onClose).toHaveBeenCalledOnce();
	});

	it('blocks each step until the required value is selected', () => {
		render(<AddEntryWindow />);

		fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
		expect(screen.getByText('Please select a mood before continuing.')).toBeInTheDocument();
		expect(screen.getByRole('radio', {name: /Very Happy/})).toBeInTheDocument();

		fireEvent.click(screen.getByRole('radio', {name: /Very Happy/}));
		fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
		fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
		expect(
			screen.getByText('Please select at least one feeling before continuing.'),
		).toBeInTheDocument();
	});

	it('shows an error and keeps the entry open when saving fails', async () => {
		mockedAddUserMood.mockRejectedValueOnce(new Error('network error'));
		const onClose = vi.fn();
		render(<AddEntryWindow onClose={onClose} />);

		fireEvent.click(screen.getByRole('radio', {name: /Very Happy/}));
		fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
		fireEvent.click(screen.getByRole('checkbox', {name: 'Joyful'}));
		fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
		fireEvent.change(screen.getByLabelText('Write about your day...'), {
			target: {value: 'I had a productive day.'},
		});
		fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
		fireEvent.click(screen.getByRole('radio', {name: /7-8 hours/}));
		fireEvent.click(screen.getByRole('button', {name: 'Submit'}));

		await waitFor(() =>
			expect(screen.getByText('Failed to save mood entry. Please try again.')).toBeInTheDocument(),
		);

		expect(addMoodEntry).not.toHaveBeenCalled();
		expect(onClose).not.toHaveBeenCalled();
	});
});
