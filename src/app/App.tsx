import { useEffect, useState } from 'react';
import shuffle from 'shuffle-array';
import MergeSortVisualizer from '../components/MergeSortVisualizer/MergeSortVisualizer';
import Scaffold from '../components/Scaffold/Scaffold';
import Node from '../model/Node';
import SettingsPanel, { SettingsPanelArgs } from '../components/SettingsPanel/SettingsPanel';
import './App.css';

// https://www.framer.com/api/motion/animation/
function App() {
  const [count, setCount] = useState(10);
  const [sortSpeed, setSortSpeed] = useState(250);
  const [nodeList, setNodeList] = useState([] as Node[]);

  useEffect(() => {
    let list: number[] = [];
    for (let i = 1; i <= count; ++i) {
      list.push(i);
    }
    setNodeList(shuffle(makeNodeList(...list)));
  }, [count]);

  return (
    <Scaffold
      title="Algorithm Visualizer"
      hideSideNav={false}
      settingsPanel={makeSettingsPanel({
        sortSpeed: sortSpeed,
        onChangeSortSpeed: setSortSpeed,
        elementCount: count,
        onChangeElementCount: setCount,
      })}
    >
      <MergeSortVisualizer items={nodeList} sortStepDelay={sortSpeed} />
    </Scaffold>
  );
}

const makeSettingsPanel = (args: SettingsPanelArgs) => {
  return <SettingsPanel {...args} />;
};

const makeNodeList = (...args: number[] | string[]): Node[] => {
  const list: Node[] = [];
  args.forEach((arg, idx) => {
    list.push(new Node({ value: arg, index: idx, id: idx }));
  });
  return list;
};

export default App;
