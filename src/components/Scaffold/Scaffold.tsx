import React, { useState } from 'react';
import clsx from 'clsx';
import getStyles from './ScaffoldStyles';
import {
  CssBaseline,
  AppBar,
  Drawer,
  Toolbar,
  List,
  ListItem,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  ShoppingCart as ShoppingCartIcon,
  Layers as LayersIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import SettingsPanel from '../SettingsPanel/SettingsPanel';

interface ScaffoldArgs {
  title: String;
  hideSideNav?: boolean;
  hideSettings?: boolean;
  // navigationOptions
  settingsPanel: JSX.Element;
}

const Scaffold: React.FC<ScaffoldArgs> = args => {
  const classes = getStyles();
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(true);
  const handleToggleNavOpen = () => {
    setNavPanelOpen(!navPanelOpen);
  };
  const handleToggleSettingsOpen = () => {
    setSettingsPanelOpen(!settingsPanelOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {!args.hideSideNav && (
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleToggleNavOpen}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {args.title}
          </Typography>
          {!args.hideSettings && (
            <IconButton color="inherit" size="medium" onClick={handleToggleSettingsOpen}>
              <SettingsIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {!args.hideSideNav && (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.navPanel, !navPanelOpen && classes.navPanelClose),
          }}
          open={navPanelOpen}
        >
          <div className={classes.appBarSpacer} />
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon className={classes.drawerIcons}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.drawerIcons}>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.drawerIcons}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.drawerIcons}>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.drawerIcons}>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Integrations" />
            </ListItem>
          </List>
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {args.children}
      </main>
      {!args.hideSettings && (
        <Paper
          className={clsx(
            classes.paper,
            classes.container,
            classes.settingsPanel,
            !settingsPanelOpen && classes.settingsPanelClose
          )}
        >
          {args.settingsPanel}
        </Paper>
      )}
    </div>
  );
};

export default Scaffold;
