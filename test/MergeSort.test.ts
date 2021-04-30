import MergeSort from '../src/algorithms/MergeSort';
import Node from '../src/model/Node';
import shuffle from 'shuffle-array';
import SortAlgorithm from '../src/algorithms/SortAlgorithm';

describe('MergeSort', () => {
  let sorter: MergeSort;

  describe('for number Nodes', () => {
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

      const sortedList = await sorter.sort(shuffledList);

      // listValues('Original list: ', originalList);
      // listValues('Shuffled list: ', shuffledList);
      // listValues('Sorted list: ', sortedList);

      expectListsToMatch(originalList, sortedList);
    });

    test('on a list of size 100', async () => {
      const vals: number[] = [];
      for (let i = 0; i < 100; ++i) {
        vals.push(i);
      }

      const originalList = makeNodeList(...vals);
      const shuffledList = shuffle(originalList, { copy: true });
      expectListsToBeDifferent(originalList, shuffledList);

      const sortedList = await sorter.sort(shuffledList);

      expectListsToMatch(originalList, sortedList);
    });

    test('on a list of size 100000', async () => {
      const vals: number[] = [];
      for (let i = 0; i < 100000; ++i) {
        vals.push(i);
      }

      const originalList = makeNodeList(...vals);
      const shuffledList = shuffle(originalList, { copy: true });
      expectListsToBeDifferent(originalList, shuffledList);

      const sortedList = await runAndLogTime(sorter, shuffledList);

      expectListsToMatch(originalList, sortedList);
    });
  });
});

const runAndLogTime = async (sorter: SortAlgorithm, arr: Node[]): Promise<Node[]> => {
  const startTime = new Date().getTime();
  const sortedList = await sorter.sort(arr);
  const endTime = new Date().getTime();

  console.log('Finished sorting ' + arr.length + ' nodes in ' + ((endTime - startTime) / 1000).toFixed(3) + ' seconds');
  return sortedList;
};

const listValues = (prefix: String, arr: Node[]): void => {
  console.log(
    prefix,
    arr.map(val => val.value)
  );
};

const makeNodeList = (...args: number[] | string[]): Node[] => {
  const list: Node[] = [];
  args.forEach(arg => {
    list.push(new Node({ value: arg }));
  });
  return list;
};

const expectListsToMatch = (arr1: Node[], arr2: Node[]): void => {
  expect(arr1.length).toEqual(arr2.length);
  for (let i = 0; i < arr1.length; ++i) {
    expect(arr1[i].value).toEqual(arr2[i].value);
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
