import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(<AddEntryWindow onClose={onClose} />);

		await user.click(screen.getByRole('radio', {name: /Very Happy/}));
		await user.click(screen.getByRole('button', {name: 'Continue'}));
		const joyfulOption = screen.getByRole('checkbox', {name: 'Joyful'});
		expect(joyfulOption).toBeInTheDocument();
		expect(document.activeElement).toBe(joyfulOption);

		await user.click(screen.getByRole('checkbox', {name: 'Joyful'}));
		await user.click(screen.getByRole('button', {name: 'Continue'}));
		const journalInput = screen.getByLabelText('Write about your day...');
		expect(journalInput).toBeInTheDocument();
		expect(document.activeElement).toBe(journalInput);

		await user.type(screen.getByLabelText('Write about your day...'), 'I had a productive day.');
		await user.click(screen.getByRole('button', {name: 'Continue'}));
		const firstSleepOption = screen.getAllByRole('radio')[0];
		expect(firstSleepOption).toBeInTheDocument();
		expect(document.activeElement).toBe(firstSleepOption);

		await user.click(screen.getByRole('radio', {name: /7-8 hours/}));
		await user.click(screen.getByRole('button', {name: 'Submit'}));

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

	it('blocks each step until the required value is selected', async () => {
		const user = userEvent.setup();
		render(<AddEntryWindow />);

		await user.click(screen.getByRole('button', {name: 'Continue'}));
		expect(screen.getByText('Please select a mood before continuing.')).toBeInTheDocument();
		expect(screen.getByRole('radio', {name: /Very Happy/})).toBeInTheDocument();

		await user.click(screen.getByRole('radio', {name: /Very Happy/}));
		await user.click(screen.getByRole('button', {name: 'Continue'}));
		expect(screen.getByRole('checkbox', {name: 'Joyful'})).toBeInTheDocument();

		await user.click(screen.getByRole('button', {name: 'Continue'}));
		expect(
			screen.getByText('Please select at least one feeling before continuing.'),
		).toBeInTheDocument();
		expect(screen.getByRole('checkbox', {name: 'Joyful'})).toBeInTheDocument();

		await user.click(screen.getByRole('checkbox', {name: 'Joyful'}));
		await user.click(screen.getByRole('button', {name: 'Continue'}));
		expect(screen.getByLabelText('Write about your day...')).toBeInTheDocument();

		await user.click(screen.getByRole('button', {name: 'Continue'}));
		expect(
			screen.getByText('Please write a few words about your day before continuing.'),
		).toBeInTheDocument();
		expect(screen.getByLabelText('Write about your day...')).toBeInTheDocument();

		await user.type(screen.getByLabelText('Write about your day...'), 'A good day.');
		await user.click(screen.getByRole('button', {name: 'Continue'}));

		expect(screen.getByRole('radio', {name: /7-8 hours/})).toBeInTheDocument();
		await user.click(screen.getByRole('button', {name: 'Submit'}));

		expect(
			screen.getByText('Please enter the number of hours you slept before continuing.'),
		).toBeInTheDocument();

		expect(screen.getByRole('radio', {name: /7-8 hours/})).toBeInTheDocument();
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
