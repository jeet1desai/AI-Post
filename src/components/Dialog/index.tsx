import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { IPostFetchHitsData } from "../../utils/interfaces/post";

interface IDialogBoxProps {
  show: boolean;
  handleClose: () => void;
  rowData: IPostFetchHitsData;
}

const RowDialogBox: React.FC<IDialogBoxProps> = ({
  show,
  handleClose,
  rowData,
}) => {
  return (
    <Dialog
      fullWidth
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Title: {rowData.title}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" color="textSecondary">
          Url: {rowData.url}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Author: {rowData.author}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Created At: {rowData.created_at}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RowDialogBox;
