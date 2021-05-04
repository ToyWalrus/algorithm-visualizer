import SortAlgorithm, { CompareFunc } from '../src/algorithms/SortAlgorithm';
import MergeSort from '../src/algorithms/MergeSort';
import BubbleSort from '../src/algorithms/BubbleSort';
import Node from '../src/model/Node';
import shuffle from 'shuffle-array';

interface SortAlgorithmTestProps {
  title: string;
  getSorter: (comparator: CompareFunc) => SortAlgorithm;
  listSizes: number[];
  skip?: boolean | boolean[];
  logResults?: boolean | boolean[];
}

describe('SortAlgorithms', () => {
  let sorter: SortAlgorithm;
  let sorters: SortAlgorithmTestProps[] = [
    { title: 'Merge Sort', getSorter: c => new MergeSort(c), listSizes: [10, 100, 10000] },
    {
      title: 'Bubble Sort',
      getSorter: c => new BubbleSort(c),
      listSizes: [10, 100, 1000],
    },
  ];

  for (let { title, getSorter, listSizes, skip, logResults } of sorters) {
    describe(title, () => {
      beforeAll(() => {
        sorter = getSorter((a, b) => {
          let v1 = a.value as number;
          let v2 = b.value as number;
          if (v1 < v2) return -1;
          if (v1 > v2) return 1;
          return 0;
        });
      });

      for (let i = 0; i < listSizes.length; ++i) {
        const shouldLog =
          logResults === true || (Array.isArray(logResults) && i < logResults.length && logResults[i] === true);
        let testFn: jest.It;
        if (skip === true || (Array.isArray(skip) && i < skip.length && skip[i] === true)) {
          testFn = test.skip;
        } else {
          testFn = test;
        }

        let listSize = listSizes[i];
        testFn('on a list of size ' + listSize, () => {
          const vals: number[] = [];
          for (let i = 0; i < listSize; ++i) {
            vals.push(i);
          }

          const originalList = makeNodeList(...vals);
          const shuffledList = shuffle(originalList, { copy: true });
          expectListsToBeDifferent(originalList, shuffledList);

          sortList(sorter, shuffledList, listSize >= 100);

          if (shouldLog) {
            sorter.listValues('Original ', originalList);
            sorter.listValues('Sorted ', shuffledList);
          }

          expectListsToMatch(originalList, shuffledList);
          expectIndexesToBeCorrect(shuffledList);
        });
      }
    });
  }
});

const sortList = (sorter: SortAlgorithm, arr: Node[], timed?: boolean): void => {
  let startTime: number, endTime: number;
  if (timed) {
    startTime = new Date().getTime();
  }

  const stepper = sorter.sort(arr);
  while (!stepper.next().done);

  if (timed) {
    endTime = new Date().getTime();
    console.log(
      'Finished sorting ' + arr.length + ' nodes in ' + ((endTime - startTime) / 1000).toFixed(3) + ' seconds'
    );
  }
};

const makeNodeList = (...args: number[]): Node[] => {
  const list: Node[] = [];
  args.forEach((arg, idx) => {
    list.push(new Node({ id: idx.toString(), value: arg, index: idx }));
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
