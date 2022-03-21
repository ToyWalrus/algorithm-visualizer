import React, { useState } from 'react';
import clsx from 'clsx';
import getStyles from './ScaffoldStyles';
import { CssBaseline, AppBar, Drawer, Toolbar, Typography, IconButton, Paper } from '@material-ui/core';
import { Menu as MenuIcon, Settings as SettingsIcon } from '@material-ui/icons';
import NavItems, { NavItem } from '../NavItems/NavItems';
import { RouteArgs } from '../../app/routes';

interface ScaffoldArgs {
	title: String;
	navItems: NavItem[];
	settingsPanel: JSX.Element;
	hideSideNav?: boolean;
	hideSettings?: boolean;
	onChangeRoute?: (route: RouteArgs) => void;
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
					<NavItems items={args.navItems} classes={classes} onChangeRoute={args.onChangeRoute} />
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
