import VeryHappyColorIcon from '@/assets/icon-very-happy-color.svg';
import VeryHappyWhiteIcon from '@/assets/icon-very-happy-white.svg';
import HappyColorIcon from '@/assets/icon-happy-color.svg';
import HappyWhiteIcon from '@/assets/icon-happy-white.svg';
import NeutralColorIcon from '@/assets/icon-neutral-color.svg';
import NeutralWhiteIcon from '@/assets/icon-neutral-white.svg';
import SadColorIcon from '@/assets/icon-sad-color.svg';
import SadWhiteIcon from '@/assets/icon-sad-white.svg';
import VerySadColorIcon from '@/assets/icon-very-sad-color.svg';
import VerySadWhiteIcon from '@/assets/icon-very-sad-white.svg';

const MOOD_ICONS: Record<Mood, {color: string; white: string}> = {
	'very-happy': {color: VeryHappyColorIcon, white: VeryHappyWhiteIcon},
	happy: {color: HappyColorIcon, white: HappyWhiteIcon},
	neutral: {color: NeutralColorIcon, white: NeutralWhiteIcon},
	sad: {color: SadColorIcon, white: SadWhiteIcon},
	'very-sad': {color: VerySadColorIcon, white: VerySadWhiteIcon},
};

interface MoodIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	mood: Mood;
	mode: 'color' | 'white';
}

export default function MoodIcon({mood, mode, ...props}: MoodIconProps) {
	return <img src={MOOD_ICONS[mood][mode]} alt={mood} {...props} />;
}
