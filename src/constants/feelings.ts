export const FEELINGS_DATA: Record<Feeling, {name: string}> = {
	joyful: {name: 'Joyful'},
	down: {name: 'Down'},
	anxious: {name: 'Anxious'},
	calm: {name: 'Calm'},
	excited: {name: 'Excited'},
	frustrated: {name: 'Frustrated'},
	lonely: {name: 'Lonely'},
	grateful: {name: 'Grateful'},
	overwhelmed: {name: 'Overwhelmed'},
	motivated: {name: 'Motivated'},
	irritable: {name: 'Irritable'},
	peaceful: {name: 'Peaceful'},
	tired: {name: 'Tired'},
	hopeful: {name: 'Hopeful'},
	confident: {name: 'Confident'},
	stressed: {name: 'Stressed'},
	content: {name: 'Content'},
	disappointed: {name: 'Disappointed'},
	optimistic: {name: 'Optimistic'},
	restless: {name: 'Restless'},
};

export const FEELINGS_OPTIONS: Option<Feeling>[] = Object.entries(FEELINGS_DATA).map(
	([value, {name}]) => ({
		value: value as Feeling,
		label: name,
	}),
);
