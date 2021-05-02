import { createStyles, makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export default makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 8,
      paddingLeft: 16,
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: '#3E6DB3',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
    drawerIcons: {
      color: theme.palette.secondary.contrastText,
    },
    navPanel: {
      position: 'relative',
      whiteSpace: 'nowrap',
      backgroundColor: '#4D94FF',
      color: theme.palette.secondary.contrastText,
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    navPanelClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    settingsPanel: {
      position: 'absolute',
      top: '25vh',
      right: '10vw',
      whiteSpace: 'nowrap',
      backgroundColor: 'whitesmoke',
      color: theme.palette.secondary.contrastText,
      transition: theme.transitions.create('top', {
        easing: theme.transitions.easing.sharp,
        duration: 350,
      }),
    },
    settingsPanelClose: {
      overflowX: 'hidden',
      top: '-100vh',
      transition: theme.transitions.create('top', {
        easing: theme.transitions.easing.sharp,
        duration: 500,
      }),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#282c34',
      padding: 16,
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
  })
);
