import { motion } from 'framer-motion';
import React from 'react';
import './DataBar.css';

interface DataBarArgs {
  /**
   * A number between 0 and 1 representing
   * the height value, with 0 being no height
   * and 1 being 100% height.
   */
  value: number;
  /**
   * A unique identifier to differentiate this
   * object from other DataBar objects.
   */
  uniqueId: string;
  /**
   * Renders over the bar if provided.
   */
  text?: string;
  /**
   * The number of pixels wide this DataBar
   * should be. Leave empty for auto-width.
   */
  width?: number;
  color?: string;
  index?: number;
}

const DataBar = (args: DataBarArgs) => {
  return (
    <motion.div layoutId={args.uniqueId} className="data-bar">
      <div className="fill-area" style={getStyle(args)}>
        {args.text}
      </div>
    </motion.div>
  );
};

const getStyle = ({ color = 'steelblue', width, value }: DataBarArgs): React.CSSProperties => {
  value = Math.max(Math.min(value, 1), 0);
  return {
    backgroundColor: color,
    height: (value * 100).toPrecision(2) + '%',
    width: (width && `${width}px`) || '95%',
  };
};

export default DataBar;
export type { DataBarArgs };
