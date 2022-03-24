import Node from 'model/Node';

/**
 * A function that takes two `Node`s and
 * returns:
 * - -1 if a is less than b
 * - 0 if a is equal to b
 * - 1 if a is greater than b
 */
export type CompareFunc = (a: Node, b: Node) => -1 | 0 | 1;

export default abstract class SortAlgorithm {
	comparator: CompareFunc;

	constructor(comparator: CompareFunc) {
		this.comparator = comparator;
	}

	/**
	 * Sort the given nodes.
	 * @param values nodes to be sorted.
	 */
	abstract sort(values: Node[]): Generator;

	listValues = (prefix: String, arr: Node[]): void => {
		console.log(
			prefix,
			arr.map(val => val.value)
		);
	};

	protected *yieldAndCompare(a: Node, b: Node): Generator<any, -1 | 0 | 1, any> {
		a.isBeingSorted = true;
		b.isBeingSorted = true;

		yield;
		const result = this.comparator(a, b);

		a.isBeingSorted = false;
		b.isBeingSorted = false;

		return result;
	}
}
