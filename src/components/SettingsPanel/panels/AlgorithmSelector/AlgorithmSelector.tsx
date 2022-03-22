import React from 'react';
import clsx from 'clsx';
import './AlgorithmSelector.scss';

interface AlgorithmOptions {
	title: string;
	onSelect: VoidFunction;
	isSelected?: boolean;
}

interface AlgorithmSelectorProps {
	options: AlgorithmOptions[];
}

const AlgorithmSelector = ({ options }: AlgorithmSelectorProps) => {
	return (
		<div className="enum-switcher">
			{options.map((op, i) => (
				<EnumSwitcherItem key={op.title} isFirst={i === 0} isLast={i === options.length - 1} option={op} />
			))}
		</div>
	);
};

interface EnumSwitcherItemProps {
	option: AlgorithmOptions;
	isFirst: boolean;
	isLast: boolean;
}

const EnumSwitcherItem = ({ isFirst, isLast, option }: EnumSwitcherItemProps) => {
	return (
		<div
			onClick={option.onSelect}
			className={clsx('enum-switcher-item', {
				first: isFirst,
				last: isLast,
				'is-selected': option.isSelected,
			})}
		>
			{option.title}
		</div>
	);
};

export default AlgorithmSelector;
