import MergeSort from '../src/algorithms/MergeSort';
import Node from '../src/model/Node';
import shuffle from 'shuffle-array';

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

      expectListsToMatch(originalList, sortedList);
    });
  });
});

const makeNodeList = (...args: number[] | string[]): Node[] => {
  const list: Node[] = [];
  args.forEach((arg) => {
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
  for (let i = 0; i < Math.min(arr1.length, arr2.length); ++i) {
    expect(arr1[i].value).not.toEqual(arr2[i].value);
  }
};
