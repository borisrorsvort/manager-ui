import { makeStyles } from "@material-ui/styles";

const HEADER_HEIGHT = 48;
const BODY_HEIGHT = 400;

export default makeStyles(theme => ({
  root: {
    position: "fixed",
    top: `calc(100% - ${HEADER_HEIGHT}px)`,
    left: "5%",
    width: "90%",
    minHeight: 200,
    background: "#fff",
    transition: "all 400ms cubic-bezier(0.4,0,0.2,1)",
    height: BODY_HEIGHT,
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "0 1px 5px 0 rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12)",

    [theme.breakpoints.up("md")]: {
      width: "70%",
      transform: "translateX(-50%)",
      left: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50%",
    },
  },
  header: {
    background: "#333",
    color: "white",
    height: HEADER_HEIGHT,
    textOverflow: "ellipsis",
    display: "flex",
    alignItems: "center",
    padding: `0 ${theme.spacing(2)}px`,
    borderRadius: "4px 4px 0 0",
    "&:hover": {
      background: "#111",
      cursor: "pointer",
    },
  },
  body: {
    padding: theme.spacing(2),
    flex: 1,
    overflowY: "scroll",
    overflowX: "hidden",
  },
  minimize: {
    marginLeft: "auto",
    transition: "all .4s .2s cubic-bezier(0.4,0,0.2,1)",
  },
  minimizeOpen: {
    transform: "scale(1, -1)",
  },
  open: {
    top: `calc(100% - ${BODY_HEIGHT}px)`,
  },
}));
