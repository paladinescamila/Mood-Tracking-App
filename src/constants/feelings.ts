export const FEELINGS: Feeling[] = [
	'joyful',
	'down',
	'anxious',
	'calm',
	'excited',
	'frustrated',
	'lonely',
	'grateful',
	'overwhelmed',
	'motivated',
	'irritable',
	'peaceful',
	'tired',
	'hopeful',
	'confident',
	'stressed',
	'content',
	'disappointed',
	'optimistic',
	'restless',
];

export const FEELINGS_DATA: Record<Feeling, {name: string}> = FEELINGS.reduce(
	(acc, feeling) => {
		acc[feeling] = {name: feeling.charAt(0).toUpperCase() + feeling.slice(1)};
		return acc;
	},
	{} as Record<Feeling, {name: string}>,
);

export const FEELINGS_OPTIONS: Option<Feeling>[] = FEELINGS.map((feeling) => ({
	value: feeling,
	label: FEELINGS_DATA[feeling].name,
}));
