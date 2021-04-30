import Node from '../model/Node';
import SortAlgorithm from './SortAlgorithm';

// Just for my own reference, it seems that the
// recursive approach to MergeSort is much faster than
// in place (according to the time test back when the
// implementation was recursive).
export default class MergeSort extends SortAlgorithm {
  sort(values: Node[]): Promise<void> {
    return this.mergeSort(values, 0, values.length - 1);
  }

  private async mergeSort(values: Node[], leftIdx: number, rightIdx: number): Promise<void> {
    if (leftIdx < rightIdx) {
      const mid = Math.floor(leftIdx + (rightIdx - leftIdx) / 2);

      await this.mergeSort(values, leftIdx, mid);
      await this.mergeSort(values, mid + 1, rightIdx);

      await this.merge(values, leftIdx, mid, rightIdx);
    }
  }

  // Sort in place
  private async merge(values: Node[], startIdx: number, mid: number, endIdx: number): Promise<void> {
    let p1 = startIdx;
    let p2 = mid + 1;

    // Is this section is already sorted?
    if ((await this.delayAndCompare(values[mid], values[p2])) <= 0) {
      values[mid].index = mid;
      values[p2].index = p2;
      return;
    }

    while (p1 <= mid && p2 <= endIdx) {
      if ((await this.delayAndCompare(values[p1], values[p2])) <= 0) {
        values[p1].index = p1;
        p1++;
      } else {
        let idx = p2;
        let tmp = values[idx];

        while (idx !== p1) {
          values[idx] = values[idx - 1];

          values[idx].index = idx;
          values[idx].isBeingSorted = true;
          await this.delayIfProvided();
          values[idx].isBeingSorted = false;

          idx--;
        }

        tmp.index = p1;
        tmp.isBeingSorted = true;
        await this.delayIfProvided();
        tmp.isBeingSorted = false;

        values[p1] = tmp;

        p1++;
        p2++;
        mid++;
      }
    }
  }

  private async delayAndCompare(left: Node, right: Node): Promise<-1 | 0 | 1> {
    left.isBeingSorted = true;
    right.isBeingSorted = true;

    await this.delayIfProvided();
    const result = this.comparator(left, right);

    left.isBeingSorted = false;
    right.isBeingSorted = false;

    return result;
  }
}
