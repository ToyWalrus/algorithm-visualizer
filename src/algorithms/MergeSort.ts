import Node from '../model/Node';
import SortAlgorithm from './SortAlgorithm';

export default class MergeSort extends SortAlgorithm {
  sort(values: Node[]): Promise<Node[]> {
    return this.merge(...this.split(values));
  }

  sortInPlace(values: Node[]): Promise<void> {
    return this.mergeInPlace(values, 0, values.length - 1);
  }

  // sort in place
  private async mergeInPlace(values: Node[] | undefined[], leftIdx: number, rightIdx: number): Promise<void> {
    if (rightIdx - leftIdx <= 1) {
      if (rightIdx === leftIdx) {
        console.warn('The right and left index were equal! (' + leftIdx + ')');
      }
      return;
    }
    if (rightIdx - leftIdx === 2) {
      let l = values[leftIdx]!;
      let r = values[rightIdx]!;

      const result = await this.delayAndCompare(l, r);

      if (result <= 0) {
        return;
      } else {
        values[leftIdx] = r;
        values[rightIdx] = l;
      }
    }

    const mid = Math.ceil((leftIdx + rightIdx) / 2);
    await this.mergeInPlace(values, leftIdx, mid);
    await this.mergeInPlace(values, mid, rightIdx);

    let leftCounter = 0;
    let rightCounter = mid;
    let tmp: Node | undefined;
    for (let i = leftIdx; i < rightIdx; ++i) {
      let insertedVal: Node;

      if (!tmp) {
        // start of merge process
        let l = values[leftCounter]!;
        let r = values[rightCounter]!;

        const result = await this.delayAndCompare(l, r);

        if (result <= 0) {
          insertedVal = l;
          tmp = r;
        } else {
          insertedVal = r;
          tmp = l;
          values[rightCounter] = undefined;
        }

        leftCounter++;
        rightCounter++;
      } else if (tmp && leftCounter < mid) {
        let l = values[leftCounter++]!;

        const result = await this.delayAndCompare(l, tmp);

        if (result <= 0) {
          insertedVal = l;
        } else {
          insertedVal = tmp;
          tmp = l;
        }
      } else if (tmp && rightCounter < rightIdx) {
        let r = values[rightCounter++]!;

        const result = await this.delayAndCompare(r, tmp);

        if (result <= 0) {
          insertedVal = r;
        } else {
          insertedVal = tmp;
          tmp = r;
        }
      } else if (tmp) {
        insertedVal = tmp;
        tmp = undefined;
      } else {
        throw new Error('We ran out of values during sort in place!');
      }

      values[i] = undefined;

      await this.delayIfProvided();

      values[i] = insertedVal;
    }
  }

  private async merge(left: Node[], right: Node[]): Promise<Node[]> {
    const mergeResult: Node[] = [];
    let mergedLeft: Node[];
    let mergedRight: Node[];

    if (left.length <= 1) {
      mergedLeft = left;
    } else {
      mergedLeft = await this.merge(...this.split(left));
    }

    if (right.length <= 1) {
      mergedRight = right;
    } else {
      mergedRight = await this.merge(...this.split(right));
    }

    let leftIdx = 0;
    let rightIdx = 0;
    for (let i = 0; i < mergedLeft.length + mergedRight.length; ++i) {
      let luckyWinner: Node;
      let l, r: Node | undefined;

      if (leftIdx < mergedLeft.length) {
        l = mergedLeft[leftIdx];
      }
      if (rightIdx < mergedRight.length) {
        r = mergedRight[rightIdx];
      }

      await this.delayIfProvided(this.msDelay);

      if (l && r) {
        const compareResult = this.comparator(l, r);

        if (compareResult <= 0) {
          luckyWinner = l;
          leftIdx++;
        } else {
          luckyWinner = r;
          rightIdx++;
        }
      } else if (l) {
        luckyWinner = l;
        leftIdx++;
      } else if (r) {
        luckyWinner = r;
        rightIdx++;
      } else {
        throw new Error('Both left and right values were undefined in Merge operation!');
      }

      mergeResult.push(luckyWinner);
    }

    return mergeResult;
  }

  private split(arr: Node[]): [Node[], Node[]] {
    if (arr.length <= 1) {
      throw new Error('Should not be calling "Split()" on array with 1 or fewer elements!');
    }

    const mid = Math.floor(arr.length / 2);
    const left: Node[] = [];
    const right: Node[] = [];
    for (let i = 0; i < arr.length; ++i) {
      if (i < mid) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [right, left];
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
