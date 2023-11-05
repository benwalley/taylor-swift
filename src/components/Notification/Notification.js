import React, {useEffect, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";

export default function Notification(props) {
    const {open, setOpen, message, type} = props

    function handleClose() {
        setOpen(false)
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type || "success"} sx={{ width: '100%' }}>
                {message || 'message'}
            </Alert>
        </Snackbar>
    );
}

