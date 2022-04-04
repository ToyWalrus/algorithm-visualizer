import React from 'react';
import './TitleRow.scss';

interface TitleRowProps {
	title: string;
	sortStep: number;
	hasStartedSorting: boolean;
	hasFinishedSorting: boolean;
}

const TitleRow = ({ title, sortStep, hasStartedSorting, hasFinishedSorting }: TitleRowProps) => {
	const firstInfo = `Sorted in ${hasFinishedSorting ? sortStep : '#'} steps`;
	const secondInfo = `Step: ${hasStartedSorting ? sortStep : '#'}`;

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
