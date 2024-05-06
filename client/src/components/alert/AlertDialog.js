import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const AlertDialog = ({
  open,
  setOpen,
  handleExtra = () => {},
  textConfirm,
  textSupport,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      className="z-[999999]"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ zIndex: 9999 }}
    >
      <DialogTitle id="alert-dialog-title">{textConfirm}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          className="dark:text-text3"
        >
          {textSupport}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy bỏ</Button>
        <Button
          onClick={() => {
            handleExtra();
            handleClose();
          }}
        >
          Xác Nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.any,
  handleExtra: PropTypes.func,
  textConfirm: PropTypes.string.isRequired,
  textSupport: PropTypes.string,
};

export default AlertDialog;
