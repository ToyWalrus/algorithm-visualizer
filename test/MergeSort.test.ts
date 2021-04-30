import MergeSort from '../src/algorithms/MergeSort';
import Node from '../src/model/Node';
import shuffle from 'shuffle-array';
import SortAlgorithm from '../src/algorithms/SortAlgorithm';

describe('MergeSort', () => {
  let sorter: MergeSort;

  describe('in place', () => {
    beforeAll(() => {
      sorter = new MergeSort((a, b) => {
        let v1 = a.value as number;
        let v2 = b.value as number;
        if (v1 < v2) return -1;
        if (v1 > v2) return 1;
        return 0;
      });
    });

    test('on a list of size 10', async () => {
      const originalList = makeNodeList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
      const shuffledList = shuffle(originalList, { copy: true });

      expectListsToBeDifferent(originalList, shuffledList);
      await sorter.sort(shuffledList);
      // sorter.listValues('Original list: ', originalList);
      // sorter.listValues('Shuffled list: ', shuffledList);
      expectListsToMatch(originalList, shuffledList);
      expectIndexesToBeCorrect(shuffledList);
    });

    test('on a list of size 100', async () => {
      const vals: number[] = [];
      for (let i = 0; i < 100; ++i) {
        vals.push(i);
      }

      const originalList = makeNodeList(...vals);
      const shuffledList = shuffle(originalList, { copy: true });
      expectListsToBeDifferent(originalList, shuffledList);

      await sorter.sort(shuffledList);

      expectListsToMatch(originalList, shuffledList);
      expectIndexesToBeCorrect(shuffledList);
    });

    test('on a list of size 100000', async () => {
      const vals: number[] = [];
      for (let i = 0; i < 100000; ++i) {
        vals.push(i);
      }

      const originalList = makeNodeList(...vals);
      const shuffledList = shuffle(originalList, { copy: true });
      expectListsToBeDifferent(originalList, shuffledList);

      await runAndLogTime(sorter, shuffledList);

      expectListsToMatch(originalList, shuffledList);
      expectIndexesToBeCorrect(shuffledList);
    });
  });
});

const runAndLogTime = async (sorter: SortAlgorithm, arr: Node[]): Promise<Node[]> => {
  const startTime = new Date().getTime();
  const sortedList = (await sorter.sort(arr)) as Node[];
  const endTime = new Date().getTime();

  console.log('Finished sorting ' + arr.length + ' nodes in ' + ((endTime - startTime) / 1000).toFixed(3) + ' seconds');
  return sortedList;
};

const makeNodeList = (...args: number[] | string[]): Node[] => {
  const list: Node[] = [];
  args.forEach((arg, idx) => {
    list.push(new Node({ value: arg, index: idx }));
  });
  return list;
};

const expectListsToMatch = (arr1: Node[], arr2: Node[]): void => {
  expect(arr1.length).toEqual(arr2.length);
  for (let i = 0; i < arr1.length; ++i) {
    expect(arr1[i].value).toEqual(arr2[i].value);
  }
};

const expectIndexesToBeCorrect = (arr: Node[]): void => {
  for (let i = 0; i < arr.length; ++i) {
    // console.log(`Index: ${i} - Node.value = ${arr[i].value}, Node.index = ${arr[i].index}`);
    expect(arr[i].index).toBe(i);
  }
};

const expectListsToBeDifferent = (arr1: Node[], arr2: Node[], shouldBeSameLength = true): void => {
  if (shouldBeSameLength) {
    expect(arr1.length).toEqual(arr2.length);
  }
  let haveDifference = false;
  for (let i = 0; i < Math.min(arr1.length, arr2.length); ++i) {
    if (arr1[i].value !== arr2[i].value) {
      haveDifference = true;
      break;
    }
  }
  expect(haveDifference).toBe(true);
};
