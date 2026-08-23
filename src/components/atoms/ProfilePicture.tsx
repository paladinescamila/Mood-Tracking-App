import AvatarPlaceholder from '@/assets/avatar-placeholder.svg';

interface ProfilePictureProps extends React.HTMLAttributes<HTMLImageElement> {
	src?: string;
}

export default function ProfilePicture({src, ...props}: ProfilePictureProps) {
	return <img src={src || AvatarPlaceholder} {...props} />;
}
