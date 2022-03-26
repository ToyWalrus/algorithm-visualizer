import Node from 'model/Node';
import SortAlgorithm from './SortAlgorithm';

// Just for my own reference, it seems that the
// recursive approach to MergeSort is much faster than
// in place (according to the time test back when the
// implementation was recursive).
export default class MergeSort extends SortAlgorithm {
	*sort(values: Node[]): Generator {
		yield* this.mergeSort(values, 0, values.length - 1);
	}

	private *mergeSort(values: Node[], leftIdx: number, rightIdx: number): Generator {
		if (leftIdx < rightIdx) {
			const mid = Math.floor(leftIdx + (rightIdx - leftIdx) / 2);

			yield* this.mergeSort(values, leftIdx, mid);
			yield* this.mergeSort(values, mid + 1, rightIdx);

			yield* this.merge(values, leftIdx, mid, rightIdx);
		}
	}

	// Sort in place
	private *merge(values: Node[], startIdx: number, mid: number, endIdx: number): Generator {
		let p1 = startIdx;
		let p2 = mid + 1;

		// Is this section is already sorted?
		if ((yield* this.yieldAndCompare(values[mid], values[p2])) <= 0) {
			values[mid].index = mid;
			values[p2].index = p2;
			return;
		}

		while (p1 <= mid && p2 <= endIdx) {
			if ((yield* this.yieldAndCompare(values[p1], values[p2])) <= 0) {
				values[p1].index = p1;
				p1++;
			} else {
				let idx = p2;
				let tmp = values[idx];

				while (idx !== p1) {
					values[idx] = values[idx - 1];
					values[idx].index = idx;
					idx--;
				}

				tmp.index = p1;
				values[p1] = tmp;

				tmp.isBeingSorted = true;
				yield;
				tmp.isBeingSorted = false;

				p1++;
				p2++;
				mid++;
			}
		}
	}

	sortFunctionToString(): string[] {
		return [];
	}
}
