import React, { useContext } from 'react';
import clsx from 'clsx';
import SettingsContext from 'model/SettingsContext';
import allAlgorithms, { AlgorithmOption } from 'model/Algorithms';
import './AlgorithmSelector.scss';

const AlgorithmSelector = () => {
	const { updateSettings } = useContext(SettingsContext);

	return (
		<div className="enum-switcher">
			{allAlgorithms.map((op, i) => (
				<EnumSwitcherItem
					key={op.title}
					isFirst={i === 0}
					isLast={i === allAlgorithms.length - 1}
					onSelect={() => {
						updateSettings({ algorithmOption: op });
					}}
					option={op}
				/>
			))}
		</div>
	);
};

interface EnumSwitcherItemProps {
	onSelect: VoidFunction;
	option: AlgorithmOption;
	isFirst: boolean;
	isLast: boolean;
}

const EnumSwitcherItem = ({ isFirst, isLast, onSelect, option }: EnumSwitcherItemProps) => {
	const { settings } = useContext(SettingsContext);
	return (
		<div
			onClick={onSelect}
			className={clsx('enum-switcher-item', {
				first: isFirst,
				last: isLast,
				'is-selected': option.title === settings.algorithmOption.title,
			})}
		>
			{option.title}
		</div>
	);
};

export default AlgorithmSelector;
