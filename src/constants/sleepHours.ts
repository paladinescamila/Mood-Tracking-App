export const SLEEP_HOURS: SleepHours[] = ['0-2', '3-4', '5-6', '7-8', '9+'];

export const SLEEP_HOURS_TO_SHOW: SleepHours[] = SLEEP_HOURS.reverse();

export const SLEEP_HOURS_VALUES: Record<SleepHours, number> = SLEEP_HOURS.reduce(
	(acc, hours, index) => {
		acc[hours] = index + 1;
		return acc;
	},
	{} as Record<SleepHours, number>,
);

export const SLEEP_HOURS_OPTIONS: Option<SleepHours>[] = SLEEP_HOURS_TO_SHOW.map((hours) => ({
	label: ` ${hours} hours`,
	value: hours,
}));
