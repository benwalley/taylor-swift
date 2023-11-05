import React, {useEffect, useState} from 'react';
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";

export default function CreateOptionDialog(props) {
    const {open, setOpen, headingText, secondaryText, newName, saveButtonText, afterSubmit, textFieldName} = props
    const [newNameValue, setNewNameValue] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setNewNameValue(newName);
    }, [newName]);

    function handleClose() {
        setOpen(false);
    }

    async function handleSubmit() {
        setLoading(true)
        await afterSubmit(newNameValue);
        setLoading(false);
        handleClose();
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            {loading ? <CircularProgress /> : <form onSubmit={handleSubmit}>
                <DialogTitle>{headingText || ''}</DialogTitle>
                <DialogContent>
                    {secondaryText && <DialogContentText>
                        {secondaryText}
                    </DialogContentText>}
                    <TextField
                        variant="outlined"
                        autoFocus
                        margin="normal"
                        id="name"
                        value={newNameValue}
                        onChange={(event) =>
                            setNewNameValue(event.target.value)
                        }
                        label={textFieldName || 'name'}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{saveButtonText || 'Add'}</Button>
                </DialogActions>
            </form>}
        </Dialog>
    );
}

