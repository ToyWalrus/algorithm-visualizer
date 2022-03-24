export enum SortSpeed {
	verySlow,
	slow,
	lessSlow,
	normal,
	lessFast,
	fast,
	veryFast,
	wickedFast,
}

export const sortSpeedString = (val: SortSpeed) => {
	switch (val) {
		case SortSpeed.verySlow:
			return 'Very slow';
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
		case SortSpeed.veryFast:
			return 'Very fast';
		case SortSpeed.wickedFast:
			return 'Like, wicked fast';
	}
};

export const sortSpeedValue = (val: SortSpeed) => {
	const normalSetting = 0.1;
	switch (val) {
		case SortSpeed.verySlow:
			return normalSetting * 15;
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
		case SortSpeed.veryFast:
			return normalSetting / 15;
		case SortSpeed.wickedFast:
			return normalSetting / 20;
	}
};
