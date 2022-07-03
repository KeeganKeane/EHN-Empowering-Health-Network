import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";
import MuiAlert from '@mui/material/Alert';

const ErrorMessage = (props) => {
    const { message, handleClose } = props;

    return (
        <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ fontSize: '12px' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default ErrorMessage;