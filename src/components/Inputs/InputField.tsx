import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import './InputStyles.scss';

interface InputFieldProps {
	value: string | number;
	onChange?: (newValue: string | number) => void;
	onSubmit?: (newValue: string | number) => void;
	className?: string;
	type?: string;
	min?: number;
	max?: number;
	step?: number;
	maxLength?: number;
}

const InputField = ({ value, onChange, onSubmit, type, className, ...props }: InputFieldProps) => {
	const [internalValue, setInternalValue] = useState(value);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setInternalValue(value);
	}, [value]);

	const finishInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newVal = e.target.value as any;

		if (type === 'number') {
			let num = Number(newVal);
			if (typeof props.min === 'number' && num < props.min) {
				newVal = props.min;
				setInternalValue(newVal);
			}
			if (typeof props.max === 'number' && num > props.max) {
				newVal = props.max;
				setInternalValue(newVal);
			}
		}

		if (onSubmit) {
			onSubmit(newVal);
		} else {
			setInternalValue(newVal);
		}
	};

	return (
		<input
			ref={inputRef}
			className={clsx('input-field', className)}
			type={type || 'text'}
			value={internalValue}
			maxLength={props.maxLength}
			step={props.step}
			min={props.min}
			max={props.max}
			onChange={e => {
				if (onChange) {
					onChange(e.target.value);
				}
				setInternalValue(e.target.value);
			}}
			onKeyDown={e => {
				if (e.key.toLowerCase() === 'enter') {
					inputRef.current?.blur();
				}
			}}
			onSubmit={finishInput}
			onBlur={finishInput}
		/>
	);
};

export default InputField;
