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

const user = {
	id: 'user-1',
	name: 'Jane Appleseed',
	email: 'jane@example.com',
	photo: '',
};

describe('AddEntryWindow', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockedAddUserMood.mockResolvedValue(undefined);
		mockedUseAppStore.mockReturnValue({
			user,
			addMoodEntry: vi.fn(),
		} as never);
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
		expect(onClose).toHaveBeenCalledOnce();
	});
});
