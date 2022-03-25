import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import './ElevatedContainer.scss';

interface ElevatedContainerProps {
	open: boolean;
	anchorEl: React.RefObject<HTMLElement>;
	margin?: number;
	className?: string;
	copyWidthOfAnchorEl?: boolean;
	onClose?: VoidFunction;
	side?: 'top' | 'bottom';
}

const ElevatedContainer = ({
	open,
	onClose,
	anchorEl,
	className,
	children,
	copyWidthOfAnchorEl = false,
	margin = 10,
	side = 'bottom',
}: React.PropsWithChildren<ElevatedContainerProps>) => {
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setIsVisible(open);
		if (open) {
			const handler = (e: MouseEvent) => {
				const { left, top, width, height } = containerRef.current!.getBoundingClientRect();

				// If the click happened outside the bounds of the container, trigger the close
				if (e.clientX < left || e.clientY < top || e.clientX > left + width || e.clientY > top + height) {
					if (onClose) {
						onClose();
					} else {
						setIsVisible(false);
					}
				}
			};
			document.body.addEventListener('click', handler);
			return () => document.body.removeEventListener('click', handler);
		}
	}, [open]);

	// TODO: extra calculations for bottom screen cutoff
	const anchorRect = anchorEl.current?.getBoundingClientRect();

	let top = (anchorRect?.bottom || 0) + margin;
	if (side === 'top') {
		const containerRect = containerRef.current?.getBoundingClientRect();
		top = (anchorRect?.top || 0) - margin - (containerRect?.height || 0);
	}

	return (
		<div
			ref={containerRef}
			className={clsx('elevated-container', className, { visible: isVisible })}
			style={{
				top,
				left: anchorRect?.left,
				width: copyWidthOfAnchorEl ? anchorRect?.width : undefined,
			}}
		>
			{children}
		</div>
	);
};

export default ElevatedContainer;
