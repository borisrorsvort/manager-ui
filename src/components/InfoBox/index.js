import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, IconButton } from "@material-ui/core";
import Icon from "@material-ui/icons/InfoTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

const useStyles = makeStyles(theme => ({
  root: {
    background: "#efefef",
    padding: theme.spacing(2, 4, 2, 0),
    borderRadius: theme.spacing(2) / 2,
    marginBottom: theme.spacing(1),
    display: "flex",
    position: "relative",
  },
  icon: {
    width: 50,
    color: theme.palette.primary.main,
  },
  closeIcon: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  smallIcon: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
}));

const InfoBox = props => {
  const classes = useStyles(props);
  const cookieName = `blsq-info-box-hesabu-${props.name}`;
  const [cookies, setCookie] = useCookies([cookieName]);

  if (!props.dismissable || !cookies[cookieName]) {
    return (
      <div className={classNames(classes.root, props.className)}>
        <Icon className={classes.icon} />
        <Typography
          variant="body2"
          component="div"
          color="primary"
          className={classes.content}
        >
          {props.children || props.text}
        </Typography>
        {props.dismissable && (
          <IconButton
            size="small"
            className={classes.closeIcon}
            onClick={() => setCookie(cookieName, true)}
          >
            <CloseIcon className={classes.smallIcon} />
          </IconButton>
        )}
      </div>
    );
  } else {
    return null;
  }
};

InfoBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  dismissable: PropTypes.bool,
};

InfoBox.defaultProps = {
  dismissable: true,
};

export default InfoBox;
