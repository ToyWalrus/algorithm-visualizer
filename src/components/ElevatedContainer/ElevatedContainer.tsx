import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import './ElevatedContainer.scss';

interface ElevatedContainerProps {
	open: boolean;
	anchorEl: React.RefObject<HTMLButtonElement>;
	className?: string;
	copyWidthOfAnchorEl?: boolean;
	onClose?: VoidFunction;
}

const ElevatedContainer = ({
	open,
	onClose,
	anchorEl,
	className,
	copyWidthOfAnchorEl,
	children,
}: React.PropsWithChildren<ElevatedContainerProps>) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(open);
		if (open) {
			const handler = () => {
				if (onClose) {
					onClose();
				} else {
					setIsVisible(false);
				}
			};
			document.body.addEventListener('click', handler);
			return () => document.body.removeEventListener('click', handler);
		}
	}, [open]);

	// TODO: extra calculations for bottom screen cutoff
	const anchorRect = anchorEl.current?.getBoundingClientRect();

	return (
		<div
			className={clsx('elevated-container', className, { visible: isVisible })}
			style={{
				top: (anchorRect?.bottom || 0) + 10,
				left: anchorRect?.left,
				width: copyWidthOfAnchorEl ? anchorRect?.width : undefined,
			}}
		>
			{children}
		</div>
	);
};

export default ElevatedContainer;
