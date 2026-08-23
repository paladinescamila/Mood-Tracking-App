type Option<T extends string> = {
	label: string;
	value: T;
	icon?: React.ReactNode;
};
