import Node from '../model/Node';

/**
 * A function that takes two `Node`s and
 * returns:
 * - -1 if a is less than b
 * - 0 if a is equal to b
 * - 1 if a is greater than b
 */
type CompareFunc = (a: Node, b: Node) => -1 | 0 | 1;

type CallbackOnWait = () => void;

export default abstract class SortAlgorithm {
  comparator: CompareFunc;
  msDelay?: number;
  callback?: CallbackOnWait;

  constructor(comparator: CompareFunc, msDelay?: number, cb?: CallbackOnWait) {
    this.comparator = comparator;
    this.msDelay = msDelay;
    this.callback = cb;
  }

  /**
   * Sort the given nodes.
   * @param values nodes to be sorted.
   */
  abstract sort(values: Node[]): Promise<Node[]>;

  protected delayIfProvided(time?: number): Promise<void> {
    time = time || this.msDelay;
    return new Promise<void>((resolve) => {
      if (time && time > 0) {
        setTimeout(() => {
          if (this.callback) {
            this.callback();
          }
          resolve();
        }, time);
      } else {
        resolve();
      }
    });
  }
}

export class NodePointer {
  node: Node;
  nodeIndex: number;

  constructor(node: Node, index: number) {
    this.node = node;
    this.nodeIndex = index;
  }
}
