import React, { useState, useEffect } from 'react';
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

	useEffect(() => {
		setInternalValue(value);
	}, [value]);

	const finishInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVal = e.target.value;
		if (onSubmit) {
			onSubmit(newVal);
		} else {
			setInternalValue(newVal);
		}
	};

	return (
		<input
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
			onSubmit={finishInput}
			onBlur={finishInput}
		/>
	);
};

export default InputField;
