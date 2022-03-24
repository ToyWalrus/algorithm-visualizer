import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import './InputStyles.scss';

export type DropdownItem = { value: any; label: string };

interface DropdownProps {
	value: any;
	options?: string[] | DropdownItem[];
	onChange?: (newValue: any) => void;
	className?: string;
}

const Dropdown = ({ value, onChange, options, className }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const anchorEl = useRef<HTMLButtonElement>(null);

	return (
		<>
			<button
				ref={anchorEl}
				className={clsx('input-field dropdown', className)}
				onClick={() => setIsOpen(wasOpen => !wasOpen)}
			>
				<span>{value}</span>
				<i className="fa fa-chevron-down chevron" />
			</button>
			{isOpen && (
				<DropdownFloatingList
					anchorEl={anchorEl}
					options={options}
					selectedOption={value}
					onSelect={val => {
						if (val && onChange) {
							onChange(val);
						}
						setIsOpen(false);
					}}
				/>
			)}
		</>
	);
};

interface DropdownFloatingListProps {
	anchorEl: React.RefObject<HTMLButtonElement>;
	options: string[] | DropdownItem[] | undefined;
	selectedOption: string | undefined;
	onSelect: (option?: any) => void;
}

const DropdownFloatingList = ({ anchorEl, onSelect, options, selectedOption }: DropdownFloatingListProps) => {
	useEffect(() => {
		const handler = () => onSelect(undefined);
		document.body.addEventListener('click', handler);
		return () => document.body.removeEventListener('click', handler);
	}, []);

	const anchorRect = anchorEl.current?.getBoundingClientRect();

	// TODO: extra calculations for bottom screen cutoff

	return (
		<div
			className="dropdown-floating-list"
			style={{
				top: (anchorRect?.bottom || 0) + 10,
				left: anchorRect?.left,
				width: anchorRect?.width,
			}}
		>
			{options &&
				options.map((op: string | DropdownItem, i: number) => {
					if (typeof op === 'string') {
						return (
							<DropdownFloatingListItem
								key={i + op}
								selected={op === selectedOption}
								onSelect={() => onSelect(op)}
							>
								{op}
							</DropdownFloatingListItem>
						);
					}
					const val = op.value;
					return (
						<DropdownFloatingListItem
							key={i + val}
							selected={val === selectedOption}
							onSelect={() => onSelect(val)}
						>
							{op.label}
						</DropdownFloatingListItem>
					);
				})}
		</div>
	);
};

interface DropdownFloatingListItemProps {
	selected: boolean;
	onSelect: VoidFunction;
}

const DropdownFloatingListItem = ({
	children,
	selected,
	onSelect,
}: React.PropsWithChildren<DropdownFloatingListItemProps>) => {
	return (
		<button className="floating-list-item" onClick={onSelect}>
			<span>{children}</span>
			{selected && <i className="fa fa-check check-icon" />}
		</button>
	);
};

export default Dropdown;
