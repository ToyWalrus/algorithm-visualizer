import React, { useState, useRef, useEffect } from 'react';
import './InputStyles.scss';

export type DropdownItem = { value: string; label: string };

interface DropdownProps {
	value: string | undefined;
	options?: string[] | DropdownItem[];
	onChange?: (newValue: string) => void;
}

const Dropdown = ({ value, onChange, options }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const anchorEl = useRef<HTMLButtonElement>(null);

	return (
		<>
			<button ref={anchorEl} className="input-field dropdown" onClick={() => setIsOpen(wasOpen => !wasOpen)}>
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
	onSelect: (option?: string) => void;
}

const DropdownFloatingList = ({ anchorEl, onSelect, options, selectedOption }: DropdownFloatingListProps) => {
	useEffect(() => {
		const handler = () => onSelect(undefined);
		document.body.addEventListener('click', handler);
		return () => document.body.removeEventListener('click', handler);
	}, []);

	const anchorRect = anchorEl.current?.getBoundingClientRect();

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
