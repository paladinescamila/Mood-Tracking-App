import Card from '../atoms/Card';
import Logo from '@/assets/logo.svg';
import Title from '../atoms/Title';
import SubTitle from '../atoms/SubTitle';

interface NoUserProps {
	title: string;
	subtitle: string;
	children?: React.ReactNode;
}

export default function NoUser({title, subtitle, children}: NoUserProps) {
	return (
		<main className='custom-gradient w-full min-h-dvh flex flex-col items-center justify-center gap-12 p-4'>
			<header>
				<img src={Logo} alt='Mood tracker logo' />
			</header>
			<Card className='flex flex-col gap-8 w-full md:w-132.5'>
				<div className='flex flex-col gap-2'>
					<Title>{title}</Title>
					<SubTitle>{subtitle}</SubTitle>
				</div>
				{children}
			</Card>
		</main>
	);
}
