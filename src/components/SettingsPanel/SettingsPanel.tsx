import { Container, Slider, Input, Typography, Grid, Divider } from '@material-ui/core';
import React from 'react';

interface SettingsPanelArgs {
  sortSpeed: number;
  onChangeSortSpeed: (speed: number) => void;
  // colors?
  elementCount: number;
  onChangeElementCount: (count: number) => void;
}

// Values in seconds
const minSpeed = 0.02;
const maxSpeed = 2;
const speedStepAmount = 0.02;
const minElements = 10;
const maxElements = 100;
const elementStepAmount = 1;

const SettingsPanel = (args: SettingsPanelArgs) => {
  return (
    <Container maxWidth="md">
      <Typography id="input-slider" gutterBottom>
        Sort speed
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item md>
          <Slider
            min={minSpeed}
            max={maxSpeed}
            step={speedStepAmount}
            style={{ minWidth: 100 }}
            value={convertSortSpeed(args.sortSpeed)}
            onChange={(_, newVal) => onChangeSortSpeed(newVal.toString(), args.onChangeSortSpeed)}
          />
        </Grid>
        <Grid item xs>
          <Input
            value={convertSortSpeed(args.sortSpeed)}
            margin="dense"
            onChange={e => onChangeSortSpeed(e.target.value, args.onChangeSortSpeed)}
            onBlur={onBlurSortSpeed}
            inputProps={{
              step: speedStepAmount,
              min: minSpeed,
              max: maxSpeed,
              type: 'number',
            }}
          />
        </Grid>
      </Grid>
      <Divider />
      <Typography id="input-slider" gutterBottom>
        Number of elements
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item md>
          <Input
            value={args.elementCount}
            margin="dense"
            onChange={e => onChangeElementCount(e.target.value, args.onChangeElementCount)}
            onBlur={onBlurSortSpeed}
            inputProps={{
              step: elementStepAmount,
              min: minElements,
              max: maxElements,
              type: 'number',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

// Sort speed given in milliseconds
const convertSortSpeed = (sortSpeed: number): number => {
  return sortSpeed / 1000;
};

const onChangeSortSpeed = (newSpeed: string, cb: (val: number) => void) => {
  if (!newSpeed) {
    return;
  }
  let parsedSpeed = Number.parseFloat(newSpeed);
  parsedSpeed = Math.min(Math.max(parsedSpeed, minSpeed), maxSpeed);
  cb(parsedSpeed * 1000);
};

const onChangeElementCount = (newCount: string, cb: (val: number) => void) => {
  if (!newCount) {
    return;
  }
  let parsedCount = Number.parseFloat(newCount);
  parsedCount = Math.min(Math.max(parsedCount, minElements), maxElements);
  cb(parsedCount);
};

const onBlurSortSpeed = () => {};

export default SettingsPanel;
export type { SettingsPanelArgs };
