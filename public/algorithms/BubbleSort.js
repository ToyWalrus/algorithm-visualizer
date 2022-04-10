'use strict';
class Algorithm {
	constructor(comparator) {
		this.comparator =
			comparator ||
			function (a, b) {
				let v1 = a.value;
				let v2 = b.value;
				if (v1 < v2) return -1;
				if (v1 > v2) return 1;
				return 0;
			};
	}
	*yieldAndCompare(a, b) {
		a.isBeingSorted = true;
		b.isBeingSorted = true;
		yield;
		const result = this.comparator(a, b);
		a.isBeingSorted = false;
		b.isBeingSorted = false;
		return result;
	}
	*sort(values) {
		let didSwap;
		let endIdx = values.length - 1;
		do {
			didSwap = false;
			for (let i = 1; i <= endIdx; ++i) {
				let v1 = values[i - 1];
				let v2 = values[i];
				if ((yield* this.yieldAndCompare(v1, v2)) === 1) {
					v1.isBeingSorted = true;
					v2.isBeingSorted = true;
					values[i - 1] = v2;
					values[i] = v1;
					v2.index = i - 1;
					v1.index = i;
					yield;
					v1.isBeingSorted = false;
					v2.isBeingSorted = false;
					didSwap = true;
				}
			}
			endIdx--;
		} while (didSwap);
	}
}
