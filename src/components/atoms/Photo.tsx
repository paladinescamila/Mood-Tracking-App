import AvatarPlaceholder from '@/assets/avatar-placeholder.svg';

interface PhotoProps extends React.HTMLAttributes<HTMLImageElement> {
	src?: string;
	size?: 'small' | 'normal' | 'large';
	className?: string;
}

export default function Photo({src, size = 'normal', className = '', ...props}: PhotoProps) {
	return (
		<img
			src={src || AvatarPlaceholder}
			className={`${size === 'small' ? 'w-10 h-10' : size === 'normal' ? 'w-16 h-16' : 'w-24 h-24'} rounded-full ${className}`}
			{...props}
		/>
	);
}
