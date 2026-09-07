import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import ProfileMenu from '@/components/organisms/ProfileMenu';
import {signOut} from '@/firebase/auth';
import {useAppStore} from '@/stores/app';

vi.mock('@/firebase/auth', () => ({
	signOut: vi.fn(),
}));

vi.mock('@/stores/app', () => ({
	useAppStore: vi.fn(),
}));

vi.mock('@/components/atoms/Icon', () => ({
	default: () => <span aria-hidden='true' />,
}));

vi.mock('@/components/atoms/Photo', () => ({
	default: ({alt}: {alt: string}) => <img alt={alt} />,
}));

vi.mock('@/components/organisms/SettingsWindow', () => ({
	default: () => null,
}));

const mockedSignOut = vi.mocked(signOut);
const mockedUseAppStore = vi.mocked(useAppStore);

const user: User = {
	id: 'user-1',
	name: 'Jane Appleseed',
	email: 'jane@example.com',
	photo: '',
};

describe('ProfileMenu', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockedSignOut.mockResolvedValue(undefined);
		mockedUseAppStore.mockReturnValue({
			setAuthUser: vi.fn(),
			setUser: vi.fn(),
			setMoodsHistory: vi.fn(),
		} as never);
	});

	it('supports keyboard navigation and returns focus to the trigger on Escape', async () => {
		const keyboard = userEvent.setup();
		render(<ProfileMenu user={user} />);

		const trigger = screen.getByRole('button', {name: 'Open profile menu for Jane Appleseed'});
		await keyboard.click(trigger);

		const menuItems = screen.getAllByRole('menuitem');
		expect(document.activeElement).toBe(menuItems[0]);

		await keyboard.keyboard('{ArrowDown}');
		expect(document.activeElement).toBe(menuItems[1]);

		await keyboard.keyboard('{ArrowUp}');
		expect(document.activeElement).toBe(menuItems[0]);

		await keyboard.keyboard('{Escape}');
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		expect(document.activeElement).toBe(trigger);
	});
});
