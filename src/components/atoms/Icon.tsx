import TrendSameIcon from '@/assets/icon-trend-same.svg';
import TrendIncreaseIcon from '@/assets/icon-trend-increase.svg';
import TrendDecreaseIcon from '@/assets/icon-trend-decrease.svg';
import SleepIcon from '@/assets/icon-sleep.svg';
import ReflectionIcon from '@/assets/icon-reflection.svg';
import QuoteIcon from '@/assets/icon-quote.svg';
import DropdownArrowIcon from '@/assets/icon-dropdown-arrow.svg';
import LogoutIcon from '@/assets/icon-logout.svg';
import SettingsIcon from '@/assets/icon-settings.svg';
import CheckIcon from '@/assets/icon-check.svg';
import CloseIcon from '@/assets/icon-close.svg';
import HintIcon from '@/assets/icon-hint.svg';
import DotsIcon from '@/assets/icon-dots.svg';

const ICONS: Record<Icon, string> = {
	'trend-same': TrendSameIcon,
	'trend-increase': TrendIncreaseIcon,
	'trend-decrease': TrendDecreaseIcon,
	sleep: SleepIcon,
	reflection: ReflectionIcon,
	quote: QuoteIcon,
	'dropdown-arrow': DropdownArrowIcon,
	logout: LogoutIcon,
	settings: SettingsIcon,
	check: CheckIcon,
	close: CloseIcon,
	hint: HintIcon,
	dots: DotsIcon,
};

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	icon: Icon;
	color?: 'original' | 'white';
	alt: string;
}

export default function Icon({icon, color = 'original', alt, ...props}: IconProps) {
	return (
		<img
			src={ICONS[icon]}
			alt={alt ?? `${icon} icon`}
			{...props}
			style={{
				...props.style,
				filter: color === 'white' ? 'brightness(0) saturate(100%) invert(100%)' : 'none',
			}}
		/>
	);
}
