import React from 'react';

interface DataBarArgs {
  /**
   * A number between 0 and 1 representing
   * the height value, with 0 being no height
   * and 1 being 100% height.
   */
  value: number;
  /**
   * Render the value over the data bar?
   * Defaults to `false`.
   */
  renderValue?: boolean;
  /**
   * The number of pixels wide this DataBar
   * should be. Leave empty for auto-width.
   */
  width?: number;
  color?: String;
  index?: number;
}

const DataBar = (args: DataBarArgs) => {
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div
        style={GetStyle(args)}
        key={'DataBar' + (args.index !== undefined ? `_${args.index}` : '')}
      >
        {args.renderValue && (args.value * 100).toPrecision(2) + '%'}
      </div>
    </div>
  );
};

const GetStyle = ({
  color = 'steelblue',
  width,
  value,
}: DataBarArgs): React.CSSProperties => {
  value = Math.max(Math.min(value, 1), 0);
  return {
    display: 'flex',
    color: 'whitesmoke',
    position: 'absolute',
    bottom: 0,
    backgroundColor: color as any,
    height: (value * 100).toPrecision(2) + '%',
    width: width && `${width}px`,
  };
};

export default DataBar;
export type { DataBarArgs };
