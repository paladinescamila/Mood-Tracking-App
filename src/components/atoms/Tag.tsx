import Icon from '@/components/atoms/Icon';

interface TagProps {
	name: string;
	checked?: boolean;
	onClick?: () => void;
	size?: 'small' | 'normal';
	icon?: React.ReactNode;
	className?: string;
	controlType?: 'radio' | 'checkbox';
	inputName?: string;
	value?: string;
}

export default function Tag({
	name,
	checked = false,
	onClick,
	size = 'normal',
	icon,
	className = '',
	controlType,
	inputName,
	value,
}: TagProps) {
	return (
		<label
			className={`flex flex-row items-center py-3 rounded-[10px] cursor-pointer bg-neutral-0 w-max border-2 ${size === 'small' ? 'gap-2 px-4 text-preset-6-regular' : 'gap-3 px-5 text-preset-5'} ${checked ? 'border-blue-600' : 'border-blue-100'} ${className}`}>
			{controlType ? (
				<input
					className='sr-only'
					type={controlType}
					name={inputName}
					value={value}
					checked={checked}
					onChange={onClick}
				/>
			) : null}
			{controlType === 'checkbox' ? (
				<div
					className={`w-4 h-4 rounded-sm flex items-center justify-center border-[1.5px] ${checked ? 'border-blue-600 bg-blue-600' : 'border-blue-200'}`}>
					{checked ? <Icon icon='check' /> : null}
				</div>
			) : (
				<div
					className={`w-5 h-5 rounded-full ${checked ? 'border-5 border-blue-600' : 'border-2 border-blue-200'}`}></div>
			)}
			<span className='select-none'>{name}</span>
			{icon && <div className='ml-auto select-none'>{icon}</div>}
		</label>
	);
}
