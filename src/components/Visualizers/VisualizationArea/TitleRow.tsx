import React from 'react';
import './TitleRow.scss';

interface TitleRowProps {
	title: string;
	sortStep: number;
	hasFinishedSorting: boolean;
}

const TitleRow = ({ title, sortStep, hasFinishedSorting }: TitleRowProps) => {
	const firstInfo = `Sorted in ${hasFinishedSorting && sortStep > 0 ? sortStep : '#'} steps`;
	const secondInfo = `Step: ${sortStep > 0 ? sortStep : '#'}`;

	return (
		<div className="title-row">
			<h1 className="title">{title}</h1>
			<div className="sorting-info">
				<div>{firstInfo}</div>
				<div>{secondInfo}</div>
			</div>
		</div>
	);
};

export default TitleRow;
