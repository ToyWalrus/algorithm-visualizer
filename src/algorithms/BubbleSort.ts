import Node from '../model/Node';
import SortAlgorithm from './SortAlgorithm';

export default class BubbleSort extends SortAlgorithm {
  *sort(values: Node[]): Generator<unknown, any, unknown> {
    let didSwap: boolean;
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
