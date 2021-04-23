import Node from '../model/Node';

/**
 * A function that takes two `Node`s and
 * returns:
 * - -1 if a is less than b
 * - 0 if a is equal to b
 * - 1 if a is greater than b
 */
type CompareFunc = (a: Node, b: Node) => -1 | 0 | 1;

export default abstract class SortAlgorithm {
  msDelay: number | undefined;
  comparator: CompareFunc;

  constructor(comparator: CompareFunc, msDelay?: number) {
    this.comparator = comparator;
    this.msDelay = msDelay;
  }

  /**
   * Sort the given nodes.
   * @param values nodes to be sorted.
   */
  abstract sort(values: Node[]): Promise<Node[]>;

  protected delayIfProvided(time?: number): Promise<void> {
    return new Promise<void>((resolve) => {
      if (time && time > 0) {
        setTimeout(resolve, time);
      } else {
        resolve();
      }
    });
  }
}
