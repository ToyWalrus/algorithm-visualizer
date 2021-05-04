import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { RouteArgs } from '../../app/routes';

interface NavItem {
  route: RouteArgs;
  selected?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

interface NavItemsArgs {
  items: NavItem[];
  classes: any;
}

const NavItems = ({ items, classes }: NavItemsArgs) => {
  const history = useHistory();

  const onClickItem = (item: NavItem) => {
    if (item.route) {
      history.push(item.route.path);
    }
  };

  return (
    <List>
      {items.map(navItem => {
        if (navItem.divider) {
          return <Divider />;
        }
        return (
          <ListItem
            button
            onClick={() => onClickItem(navItem)}
            disabled={navItem.disabled || !navItem.route.Visualizer}
          >
            <ListItemIcon className={clsx(classes.navIcon, navItem.selected && classes.navIconSelected)}>
              {navItem.route.icon}
            </ListItemIcon>
            <ListItemText primary={navItem.route.title} className={clsx(navItem.selected && classes.navIconSelected)} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default NavItems;
export type { NavItemsArgs, NavItem };
