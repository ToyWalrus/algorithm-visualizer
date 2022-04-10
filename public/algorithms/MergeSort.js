'use strict';
class MergeSort {
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
		yield* this.mergeSort(values, 0, values.length - 1);
	}
	*mergeSort(values, leftIdx, rightIdx) {
		if (leftIdx < rightIdx) {
			const mid = Math.floor(leftIdx + (rightIdx - leftIdx) / 2);
			yield* this.mergeSort(values, leftIdx, mid);
			yield* this.mergeSort(values, mid + 1, rightIdx);
			yield* this.merge(values, leftIdx, mid, rightIdx);
		}
	}
	// Sort in place
	*merge(values, startIdx, mid, endIdx) {
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
}
