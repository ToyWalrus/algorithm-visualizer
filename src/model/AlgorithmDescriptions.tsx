import clsx from 'clsx';

const italic = 'italic';
const emphasis = 'emphasis';
const lowEmphasis = `${emphasis} low`;

const description = 'description-text';
const complexity = `complexity-formula`;
const extraInfo = 'extra-info';

const red = 'red';
const blue = 'blue';
const green = 'green';
const primary = 'primary';

interface ChildProp {
	children: string;
}

const AlgorithmName = ({ children }: ChildProp) => {
	return <span className={clsx(emphasis, primary)}>{children}</span>;
};

const KeyConcept = ({ children, noEmphasis }: ChildProp & { noEmphasis?: boolean }) => {
	return <span className={clsx(!noEmphasis && lowEmphasis, green, italic)}>{children}</span>;
};

const Drawback = ({ children }: ChildProp) => {
	return <span className={clsx(red, italic)}>{children}</span>;
};

const ExplanationInfo = ({ children }: ChildProp) => {
	return <span className={clsx(blue, italic)}>{children}</span>;
};

export const MergeSortDescriptors = {
	description: (
		<span className={description}>
			<AlgorithmName>Merge Sort</AlgorithmName> is a&nbsp;
			<ExplanationInfo>divide-and-conquer</ExplanationInfo> algorithm. It works by splitting the list of elements
			in half <KeyConcept>recursively</KeyConcept> until it reaches a size of only two elements, which it can then
			sort. Then it merges the two sorted halves together back up the recursion chain, finally returning the full
			sorted list.
		</span>
	),
	complexity: <span className={complexity}>O(n*log(n))</span>,
	extraInfo: (
		<span className={extraInfo}>
			<AlgorithmName>Merge Sort</AlgorithmName> requires&nbsp;
			<Drawback>extra memory</Drawback> space for the temporary arrays it creates during recursion&nbsp;
			<span className={clsx(lowEmphasis)}>(O(n))</span>. Additionally, it will&nbsp;
			<Drawback>still perform all the steps</Drawback> if the elements are already sorted. However, it is the
			algorithm of choice when working with&nbsp;
			<ExplanationInfo>linked-lists</ExplanationInfo> or on&nbsp;
			<ExplanationInfo>very large collections of data</ExplanationInfo> with an&nbsp;
			<span className={clsx(lowEmphasis)}>O(n)</span> lookup time.
		</span>
	),
};

export const BubbleSortDescriptors = {
	description: (
		<span className={description}>
			<AlgorithmName>Bubble Sort</AlgorithmName> works by traversing the list, comparing the current element with
			the next element, and <KeyConcept>swapping</KeyConcept> the two if the current element is greater than the
			next element. Once the end of the list is reached, the current element is guaranteed to be the
			highest-valued element from that pass. This is then repeated&nbsp;
			<span className={clsx(lowEmphasis, italic)}>n</span> times with each pass bringing the next highest-valued
			element to the end.
		</span>
	),
	extraInfo: (
		<span className={extraInfo}>
			<AlgorithmName>Bubble Sort</AlgorithmName> is arguably the most simple sorting algorithm, and is frequently
			used to&nbsp;
			<ExplanationInfo>introduce the concept of list sorting to beginngers</ExplanationInfo>. Due to it needing to
			traverse the entire list each pass, <Drawback>it has the slowest time complexity</Drawback>
			&nbsp;of the three here. Performance can be improved by&nbsp;
			<KeyConcept noEmphasis>traversing one fewer element each pass</KeyConcept>, since it's guaranteed that the
			final element(s) have already been sorted to their final position.
		</span>
	),
	complexity: (
		<span className={complexity}>
			O(n<sup>2</sup>)
		</span>
	),
};

export const QuickSortDescriptors = {
	description: (
		<span className={description}>
			<AlgorithmName>Quick Sort</AlgorithmName> is a&nbsp;
			<ExplanationInfo>divide-and-conquer</ExplanationInfo> algorithm. It works by selecting a single element in
			the list as a <KeyConcept>partition</KeyConcept> element and compares list elements against it. Elements
			less than or equal to the value of the partition are allocated to one side, while elements greater than the
			value of the partition are allocated to the other. Then each side recursively repeats the same process until
			the list is sorted.
		</span>
	),
	extraInfo: (
		<span className={extraInfo}>
			<AlgorithmName>Quick Sort</AlgorithmName> may have a worse "worst case" time complexity, but on
			average&nbsp;
			<span className={clsx(italic, green)}>
				generally performs better than &nbsp;
				<AlgorithmName>Merge Sort</AlgorithmName>
			</span>
			&nbsp; when not working with&nbsp;
			<ExplanationInfo>linked-lists</ExplanationInfo>, since it will often suffer from&nbsp;
			<Drawback>poor partition choices without random access.</Drawback>
		</span>
	),
	complexity: (
		<span className={complexity}>
			O(n*log(n)) <sub>avg</sub> O(n<sup>2</sup>) <sub>worst</sub>
		</span>
	),
};
