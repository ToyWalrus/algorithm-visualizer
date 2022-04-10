import Node from 'model/Node';
import SortAlgorithm from './SortAlgorithm';

export default class QuickSort extends SortAlgorithm {
	*sort(values: Node[]): Generator<unknown, any, unknown> {
		yield* this.quickSort(values, 0, values.length - 1);
	}

	// This is using the Lomuto partition scheme
	// https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
	private *quickSort(values: Node[], low: number, high: number): Generator {
		if (low < high) {
			let pivot = yield* this.partition(values, low, high);

			yield* this.quickSort(values, low, pivot - 1);
			yield* this.quickSort(values, pivot, high);
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

	sortFunctionToString(): string[] {
		const args = ['values'];
		const sortFuncString = this.sort.toString();
		const quickSortFuncString = this.quickSort.toString();
		const partitionFuncString = this.partition.toString();
		let funcString = this.getYieldAndCompareFunctionString();
		funcString += `\nthis.quickSort = function*${quickSortFuncString.substring(quickSortFuncString.indexOf('('))}`;
		funcString += `\nthis.partition = function*${partitionFuncString.substring(partitionFuncString.indexOf('('))}`;
		funcString += '\n' + sortFuncString.substring(sortFuncString.indexOf('{') + 1, sortFuncString.lastIndexOf('}'));
		return [...args, funcString];
	}
}
