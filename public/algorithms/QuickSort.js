'use strict';
class QuickSort {
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
		yield* this.quickSort(values, 0, values.length - 1);
	}
	// This is using the Lomuto partition scheme
	// https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
	*quickSort(values, low, high) {
		if (low < high) {
			let pivot = yield* this.partition(values, low, high);
			yield* this.quickSort(values, low, pivot - 1);
			yield* this.quickSort(values, pivot, high);
		}
	}
	*partition(values, low, high) {
		let pivot = values[high];
		let i = low;
		for (let j = low; j < high; ++j) {
			if ((yield* this.yieldAndCompare(values[j], pivot)) <= 0) {
				pivot.isBeingSorted = true; // setting this to true so it's always highlighted
				values[i].isBeingSorted = true;
				values[j].isBeingSorted = true;
				let tmp = values[j];
				values[j] = values[i];
				values[i] = tmp;
				values[j].index = j;
				values[i].index = i;
				yield;
				values[i].isBeingSorted = false;
				values[j].isBeingSorted = false;
				i++;
			}
		}
		values[i].isBeingSorted = true;
		values[high].isBeingSorted = true;
		let tmp = values[i];
		values[i] = values[high];
		values[high] = tmp;
		values[i].index = i;
		values[high].index = high;
		yield;
		values[i].isBeingSorted = false;
		values[high].isBeingSorted = false;
		return i;
	}
}
