import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import './InputStyles.scss';

export type DropdownItem = { value: any; label: string };

interface DropdownProps {
	value: any;
	options?: string[] | DropdownItem[];
	onChange?: (newValue: any) => void;
	valueEquator?: (a: any, b: any) => boolean;
	className?: string;
}

const Dropdown = ({ value, onChange, options, valueEquator, className }: DropdownProps) => {
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
			<DropdownFloatingList
				open={isOpen}
				options={options}
				anchorEl={anchorEl}
				selectedOption={value}
				valueEquator={valueEquator}
				onSelect={val => {
					if (typeof val !== 'undefined' && onChange) {
						onChange(val);
					}
					setIsOpen(false);
				}}
			/>
		</>
	);
};

interface DropdownFloatingListProps {
	open: boolean;
	anchorEl: React.RefObject<HTMLButtonElement>;
	options: string[] | DropdownItem[] | undefined;
	selectedOption: string | undefined;
	valueEquator?: (a: any, b: any) => boolean;
	onSelect: (option?: any) => void;
}

const DropdownFloatingList = ({
	open,
	anchorEl,
	onSelect,
	options,
	valueEquator,
	selectedOption,
}: DropdownFloatingListProps) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(open);
		if (open) {
			const handler = () => onSelect(undefined);
			document.body.addEventListener('click', handler);
			return () => document.body.removeEventListener('click', handler);
		}
	}, [open]);

	const isEqual = (a: any, b: any) => {
		if (valueEquator) return valueEquator(a, b);
		return a === b;
	};

	// TODO: extra calculations for bottom screen cutoff
	const anchorRect = anchorEl.current?.getBoundingClientRect();

	return (
		<div
			className={clsx('dropdown-floating-list', { visible: isVisible })}
			style={{
				top: (anchorRect?.bottom || 0) + 10,
				left: anchorRect?.left,
				width: anchorRect?.width,
			}}
		>
			{options &&
				options.map((op: string | DropdownItem, i: number) => {
					let selected: boolean;
					if (typeof op === 'string') {
						selected = isEqual(op, selectedOption);
						return (
							<DropdownFloatingListItem
								key={i + op + selected}
								selected={selected}
								visible={isVisible}
								onSelect={() => onSelect(op)}
							>
								{op}
							</DropdownFloatingListItem>
						);
					}
					const val = op.value;
					selected = isEqual(val, selectedOption);
					return (
						<DropdownFloatingListItem
							key={i + val + selected}
							visible={isVisible}
							selected={selected}
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
	visible: boolean;
}

const DropdownFloatingListItem = ({
	children,
	selected,
	onSelect,
	visible,
}: React.PropsWithChildren<DropdownFloatingListItemProps>) => {
	return (
		<button className="floating-list-item" onClick={onSelect} disabled={!visible}>
			<span>{children}</span>
			<i className={clsx('fa fa-check check-icon', { selected })} />
		</button>
	);
};

export default Dropdown;
