import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import './InputStyles.scss';

interface InputFieldProps {
	value: string | number;
	onChange: (newValue: string | number) => void;
	className?: string;
	type?: string;
}

const InputField = ({ value, onChange, type, className }: InputFieldProps) => {
	const [internalValue, setInternalValue] = useState(value);

	useEffect(() => {
		setInternalValue(value);
	}, [value]);

	const finishInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVal = e.target.value;
		if (onChange) {
			onChange(newVal);
		} else {
			setInternalValue(newVal);
		}
	};

	return (
		<input
			className={clsx('input-field', className)}
			type={type || 'text'}
			value={internalValue}
			onChange={e => setInternalValue(e.target.value)}
			onSubmit={finishInput}
			onBlur={finishInput}
		/>
	);
};

export default InputField;
