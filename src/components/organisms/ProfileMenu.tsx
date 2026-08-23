import Icon from '../atoms/Icon';
import Photo from '../atoms/Photo';

export default function ProfileMenu({user}: {user: User}) {
	return (
		<div className='relative'>
			<button className='flex flex-row gap-2.5 items-center cursor-pointer'>
				<Photo src={user.photo} className='w-10 h-10' />
				<Icon icon='dropdown-arrow' />
			</button>
			<div className='absolute top-[100%+8px] ring-0 px-4 py-3 bg-neutral-0 rounded flex flex-col gap-3 w-50 menu-shadow'>
				<div className='flex flex-col gap-0.5'>
					<p className='text-preset-6 text-neutral-900'>{user.name}</p>
					<p className='text-preset-7 text-neutral-300'>{user.email}</p>
				</div>
				<div className='w-full h-px bg-blue-100' />
				<button className='flex flex-row gap-2.5 cursor-pointer'>
					<Icon icon='settings' />
					<p className='text-preset-7 text-neutral-900'>Settings</p>
				</button>
				<button className='flex flex-row gap-2.5 cursor-pointer'>
					<Icon icon='logout' />
					<p className='text-preset-7 text-neutral-900'>Logout</p>
				</button>
			</div>
		</div>
	);
}
