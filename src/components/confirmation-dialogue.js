import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import If from "./if";
import SaveIcon from '@mui/icons-material/Save';
import Spinner from "./spinner";

const ConfirmationDialog = ({
    open,
    data,
    onClose,
    isLoading = false,
    buttonValue = "Yes",
    cancelBtnId = "cancel-btn",
    okBtnId = "ok-btn",
    isSave = false
}) => {
    const handleClose = (
        _event,
        isConfirmed = false,
        isSave = false
    ) => {
        if (isConfirmed) {
            onClose(data, isConfirmed, isSave);
        } else {
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => onClose()} // Prevent accidental closing
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ wordBreak: "break-word" }}>
                {data?.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" component="div">
                    {data?.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button id={cancelBtnId} disabled={isLoading} onClick={handleClose}>
                    Close
                </Button>
                <Button
                    id={okBtnId}
                    onClick={(e) => handleClose(e, true)}
                    autoFocus
                    variant="contained"
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner size={20} /> : buttonValue}
                </Button>
                <If condition={isSave}>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        disabled={isLoading}
                        onClick={(e) => handleClose(e, true, true)}
                    >
                        Save as Draft
                    </Button>
                </If>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
