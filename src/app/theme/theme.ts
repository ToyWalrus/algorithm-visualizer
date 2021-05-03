import { createMuiTheme } from '@material-ui/core';

let primary = '#1EB053'; // main
let accent = '#F2CF63'; // secondary
let secondary = '#9340CF'; // accent
let black = '#262626'; // background
let white = '#EFF0FF'; // white

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      dark: '#025930',
      light: '#77caa3',
      contrastText: white,
    },
    secondary: {
      main: secondary,
      dark: '#c2a54f',
      light: '#f6dd92',
      contrastText: white,
    },
    info: {
      main: accent,
      dark: '#7d9aae',
      light: '#bad3e4',
      contrastText: black,
    },
    common: {
      black,
      white,
    },
  },
});

export default theme;
