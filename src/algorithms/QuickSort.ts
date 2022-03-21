import Node from '../model/Node';
import SortAlgorithm from './SortAlgorithm';

export default class QuickSort extends SortAlgorithm {
	*sort(values: Node[]): Generator<unknown, any, unknown> {
		yield* this.quicksort(values, 0, values.length - 1);
	}

	// This is using the Lomuto partition scheme
	// https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
	private *quicksort(values: Node[], low: number, high: number): Generator {
		if (low < high) {
			let pivot = yield* this.partition(values, low, high);

			yield* this.quicksort(values, low, pivot - 1);
			yield* this.quicksort(values, pivot, high);
		}
	}

	private *partition(values: Node[], low: number, high: number): Generator<any, number, any> {
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
