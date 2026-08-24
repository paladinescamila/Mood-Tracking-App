export const SLEEP_HOURS: SleepHours[] = ['9+', '7-8', '5-6', '3-4', '0-2'];

export const SLEEP_HOURS_OPTIONS: Option<SleepHours>[] = SLEEP_HOURS.map((hours) => ({
	label: ` ${hours} hours`,
	value: hours,
}));
