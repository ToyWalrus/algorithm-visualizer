export enum SortSpeed {
	slow,
	lessSlow,
	normal,
	lessFast,
	fast,
	wickedFast,
}

export const sortSpeedString = (val: SortSpeed) => {
	switch (val) {
		case SortSpeed.slow:
			return 'Slow';
		case SortSpeed.lessSlow:
			return 'Less slow';
		case SortSpeed.normal:
			return 'Normal';
		case SortSpeed.lessFast:
			return 'Less fast';
		case SortSpeed.fast:
			return 'Fast';
		case SortSpeed.wickedFast:
			return 'Like, wicked fast';
	}
};

/**
 * @returns The value in milliseconds each sort step should take
 */
export const sortSpeedValue = (val: SortSpeed) => {
	const normalSetting = 100;
	switch (val) {
		case SortSpeed.slow:
			return normalSetting * 10;
		case SortSpeed.lessSlow:
			return normalSetting * 5;
		case SortSpeed.normal:
			return normalSetting;
		case SortSpeed.lessFast:
			return normalSetting / 5;
		case SortSpeed.fast:
			return normalSetting / 10;
		case SortSpeed.wickedFast:
			return normalSetting / 20;
	}
};
