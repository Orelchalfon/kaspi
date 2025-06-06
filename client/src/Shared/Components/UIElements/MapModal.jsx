/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import "./MapModal.css";

const MapModal = (props) => {
  const { open, onClose, title, footer, children } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={`card ${props.className}`}
    >
      <div className="modal">
        <DialogTitle  className="modal__header" id="alert-dialog-title">
          <h2>{title}</h2>
        </DialogTitle>
        <DialogContent  sx={{overflow:"hidden",padding:0}} className={`modal__content ${props.contentClass}`}>
          <DialogContentText
            className={props.contentTxtClass}
            id="alert-dialog-description"
          >
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={`modal__footer ${props.footerClass}`}>
          {footer}
        </DialogActions>
      </div>
    </Dialog>
  );
};
export default MapModal;
