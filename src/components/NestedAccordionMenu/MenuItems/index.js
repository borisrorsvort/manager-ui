import React, { Fragment, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import classNames from "classnames";
import useStyles from "./styles";
function MenuItem(props) {
  const { to, name, items, Icon, depth, currentPath } = props;
  const classes = useStyles({ depth: depth });
  const [collapsed, setCollapsed] = useState(true);
  const hasSubItems = Array.isArray(items);
  let found = false;
  let hasIcon = false;
  let expandIcon;

  function toggleCollapse() {
    setCollapsed(prevValue => !prevValue);
  }

  function isChildrenActive(subItems) {
    subItems.forEach(element => {
      if (currentPath.startsWith(element.to)) {
        found = true;
      }
      if (element.items) {
        isChildrenActive(element.items);
      }
    });
    return found;
  }

  function hasIcons(subItems) {
    subItems.forEach(itm => {
      if (itm.Icon) {
        hasIcon = true;
      }
    });
    return hasIcon;
  }

  const active = to === currentPath && !hasSubItems;
  const activeSubParent = hasSubItems && isChildrenActive(items);
  const hasIconItems = items && hasIcons(items);

  if (hasSubItems && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon className={classes.sidebarItemExpandArrowAxpanded} />
    ) : (
      <ExpandMoreIcon className={classes.sidebarItemExpandArrow} />
    );
  }
  const LinkComponent = props.link;
  const incons = props.hasIconInItems && props.hasIconInItems;
  return (
    <Fragment>
      <ListItem
        className={classes.sidebarItem}
        onClick={hasSubItems ? toggleCollapse : undefined}
        button
        to={to}
        component={hasSubItems ? undefined : LinkComponent}
        classes={{
          button: classNames({
            [classes.activeColor]: active && !hasSubItems && depth,
            [classes.activeBackground]:
              (active && !hasSubItems && !depth) ||
              (hasSubItems && collapsed && activeSubParent && !depth),
          }),
        }}
      >
        <div className={classes.sidebarItemContent}>
          {incons && (
            <ListItemIcon>
              {Icon && <Icon className={classes.sidebarItemIcon} />}
            </ListItemIcon>
          )}
          <ListItemText primary={name} />
        </div>
        {expandIcon}
      </ListItem>
      <Collapse
        className={classes.collapse}
        in={!collapsed}
        timeout="auto"
        unmountOnExit
      >
        {hasSubItems ? (
          <List component="div">
            {items &&
              items.map((subItem, index) => (
                <MenuItem
                  key={`${subItem.name}${index}`}
                  depth={depth + 1}
                  {...subItem}
                  currentPath={currentPath}
                  link={LinkComponent}
                  hasIconInItems={hasIconItems}
                />
              ))}
          </List>
        ) : null}
      </Collapse>
    </Fragment>
  );
}
MenuItem.defaultProps = { depth: 0 };
export default MenuItem;
