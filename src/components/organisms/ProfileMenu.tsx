import {useState} from 'react';
import {logout} from '@/firebase/auth';
import {useClickOutside} from '@/hooks/useClickOutside';
import Icon from '@/components/atoms/Icon';
import Photo from '@/components/atoms/Photo';
import SettingsWindow from '@/components/organisms/SettingsWindow';

interface ProfileMenuProps {
	user: User;
}

export default function ProfileMenu({user}: ProfileMenuProps) {
	const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);
	const [settingsWindowIsOpened, setSettingsWindowIsOpened] = useState<boolean>(false);

	const {ref} = useClickOutside(() => setMenuIsOpened(false));

	const handleOpenSettings = () => {
		setMenuIsOpened(false);
		setSettingsWindowIsOpened(true);
	};

	return (
		<div className='relative'>
			<button
				className='flex flex-row gap-2.5 items-center cursor-pointer custom-outline'
				onClick={() => setMenuIsOpened(!menuIsOpened)}>
				<Photo src={user.photo} size='small' alt={`${user.name}'s photo`} />
				<Icon icon='dropdown-arrow' />
			</button>
			<div
				ref={ref}
				className='absolute top-[calc(100%+8px)] right-0 px-4 py-3 bg-neutral-0 rounded flex flex-col gap-3 min-w-50 max-w-60 menu-shadow'
				style={{display: menuIsOpened ? 'flex' : 'none'}}>
				<div className='flex flex-col gap-0.5'>
					<p className='text-preset-6 text-neutral-900'>{user.name}</p>
					<p className='text-preset-7 text-neutral-300 truncate'>{user.email}</p>
				</div>
				<div className='w-full h-px bg-blue-100' />
				<button
					className='flex flex-row gap-2.5 cursor-pointer hover:opacity-70'
					onClick={handleOpenSettings}>
					<Icon icon='settings' />
					<p className='text-preset-7 text-neutral-900'>Settings</p>
				</button>
				<button className='flex flex-row gap-2.5 cursor-pointer hover:opacity-70' onClick={logout}>
					<Icon icon='logout' />
					<p className='text-preset-7 text-neutral-900'>Logout</p>
				</button>
			</div>
			{settingsWindowIsOpened && (
				<SettingsWindow onClose={() => setSettingsWindowIsOpened(false)} />
			)}
		</div>
	);
}
