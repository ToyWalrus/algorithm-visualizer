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

	constructor(comparator?: CompareFunc) {
		this.comparator =
			comparator ||
			function (a, b) {
				let v1 = a.value as number;
				let v2 = b.value as number;
				if (v1 < v2) return -1;
				if (v1 > v2) return 1;
				return 0;
			};
	}

	/**
	 * Sort the given nodes.
	 * @param values nodes to be sorted.
	 */
	abstract sort(values: Node[]): Generator;

	/**
	 * Get a string representation of the sort
	 * functionality to be used in a `new Function()`
	 * constructor.
	 */
	abstract sortFunctionToString(): string[];

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

	protected getYieldAndCompareFunctionString(): string {
		const comparatorFuncString = this.comparator.toString();
		const yieldFuncString = this.yieldAndCompare.toString();
		let funcString = `this.comparator = ${comparatorFuncString}`;
		funcString += `\nthis.yieldAndCompare = function*${yieldFuncString.substring(yieldFuncString.indexOf('('))}`;
		return funcString;
	}
}
