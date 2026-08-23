import Screen from '../atoms/Screen';
import Logo from '../atoms/Logo';
import Title from '../atoms/Title';
import SubTitle from '../atoms/SubTitle';

interface NoUserProps {
	title: string;
	subtitle: string;
	children?: React.ReactNode;
}

export default function NoUser({title, subtitle, children}: NoUserProps) {
	return (
		<Screen className='items-center justify-center gap-12'>
			<header>
				<Logo />
			</header>
			<div className='flex flex-col gap-8 w-full md:w-132.5 px-4 md:px-8 py-10 rounded-2xl bg-neutral-0 card-shadow'>
				<div className='flex flex-col gap-2'>
					<Title>{title}</Title>
					<SubTitle>{subtitle}</SubTitle>
				</div>
				{children}
			</div>
		</Screen>
	);
}
