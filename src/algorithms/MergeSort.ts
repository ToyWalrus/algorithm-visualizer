import Node from '../model/Node';
import SortAlgorithm from './SortAlgorithm';

export default class MergeSort extends SortAlgorithm {
  sort(values: Node[]): Promise<Node[]> {
    return this.merge(...this.split(values));
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
