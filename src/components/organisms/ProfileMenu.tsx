import {useEffect, useRef, useState} from 'react';
import {signOut} from '@/firebase/auth';
import {useClickOutside} from '@/hooks/useClickOutside';
import {useAppStore} from '@/stores/app';
import Icon from '@/components/atoms/Icon';
import Photo from '@/components/atoms/Photo';
import SettingsWindow from '@/components/organisms/SettingsWindow';

interface ProfileMenuProps {
	user: User;
}

export default function ProfileMenu({user}: ProfileMenuProps) {
	const {setAuthUser, setUser, setMoodsHistory} = useAppStore();

	const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);
	const [settingsWindowIsOpened, setSettingsWindowIsOpened] = useState<boolean>(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	const {ref} = useClickOutside(() => setMenuIsOpened(false));

	useEffect(() => {
		if (menuIsOpened) {
			ref.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
		}
	}, [menuIsOpened, ref]);

	const closeMenu = () => {
		setMenuIsOpened(false);
		triggerRef.current?.focus();
	};

	const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const menuItems = Array.from(
			ref.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') || [],
		);
		const currentIndex = menuItems.indexOf(document.activeElement as HTMLElement);

		if (event.key === 'Escape') {
			event.preventDefault();
			closeMenu();
		} else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			const direction = event.key === 'ArrowDown' ? 1 : -1;
			const nextIndex = (currentIndex + direction + menuItems.length) % menuItems.length;
			menuItems[nextIndex]?.focus();
		}
	};

	const handleOpenSettings = () => {
		setMenuIsOpened(false);
		setSettingsWindowIsOpened(true);
	};

	const logout = async () => {
		try {
			await signOut();

			setAuthUser(null);
			setUser(null);
			setMoodsHistory([]);
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	return (
		<div className='relative' ref={ref}>
			<button
				ref={triggerRef}
				type='button'
				className='flex flex-row gap-2.5 items-center cursor-pointer custom-outline'
				aria-expanded={menuIsOpened}
				aria-haspopup='menu'
				aria-controls='profile-menu'
				aria-label={`${menuIsOpened ? 'Close' : 'Open'} profile menu for ${user.name}`}
				onClick={() => setMenuIsOpened(!menuIsOpened)}
				onKeyDown={(event) => {
					if (event.key === 'ArrowDown') {
						event.preventDefault();
						setMenuIsOpened(true);
					}
					if (event.key === 'Escape' && menuIsOpened) {
						event.preventDefault();
						closeMenu();
					}
				}}>
				<Photo src={user.photo} size='small' alt={`${user.name}'s photo`} />
				<Icon icon='dropdown-arrow' alt='Open profile menu' />
			</button>
			<div
				id='profile-menu'
				role='menu'
				aria-hidden={!menuIsOpened}
				onKeyDown={handleMenuKeyDown}
				className={`absolute top-[calc(100%+8px)] right-0 px-4 py-3 bg-neutral-0 rounded flex-col gap-3 min-w-50 max-w-60 menu-shadow ${menuIsOpened ? 'flex' : 'hidden'}`}>
				<div className='flex flex-col gap-0.5'>
					<p className='text-preset-6 text-neutral-900'>{user.name}</p>
					<p className='text-preset-7 text-neutral-300 truncate'>{user.email}</p>
				</div>
				<div className='w-full h-px bg-blue-100' />
				<button
					type='button'
					role='menuitem'
					className='flex flex-row gap-2.5 cursor-pointer hover:opacity-70'
					onClick={handleOpenSettings}>
					<Icon icon='settings' alt='Open settings' />
					<p className='text-preset-7 text-neutral-900'>Settings</p>
				</button>
				<button
					type='button'
					role='menuitem'
					className='flex flex-row gap-2.5 cursor-pointer hover:opacity-70'
					onClick={logout}>
					<Icon icon='logout' alt='Logout' />
					<p className='text-preset-7 text-neutral-900'>Logout</p>
				</button>
			</div>
			{settingsWindowIsOpened && (
				<SettingsWindow onClose={() => setSettingsWindowIsOpened(false)} />
			)}
		</div>
	);
}
