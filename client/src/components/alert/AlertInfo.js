import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertInfo = ({ open = true, severity = "success", children }) => {
  // console.log(open);
  const [openAlert, setOpenAlert] = useState(open);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: "100%",
          backgroundColor: severity === "success" ? "#4AC860" : "#E64B59",
        }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

AlertInfo.propTypes = {
  open: PropTypes.bool,
  severity: PropTypes.oneOf(["success", "error"]),
  children: PropTypes.string,
};

export default AlertInfo;
