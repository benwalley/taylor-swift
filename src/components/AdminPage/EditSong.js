import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SongSelectField from "./SongSelectField";
import {useRecoilState} from "recoil";
import {addStep} from "../../state/atoms/addStep";
import EditSongContentsContainer from "./EditSongContentsContainer";

export default function EditSong(props) {
    const {} = props
    const [activeStep, setActiveStep] = useRecoilState(addStep)
    const [dialogOpen, setDialogOpen] = useState(false)

    function handleBack() {
        setDialogOpen(true)
    }


    function handleConfirmedBack() {
        setDialogOpen(false)
        setActiveStep(activeStep - 1);
    }

    function handleCancel() {
        setDialogOpen(false)
    }


    return (
        <div className='grid'>
            <Stack direction={'row'} spacing={2} margin='normal'>
                <Button onClick={handleBack} aria-label="back" startIcon={<KeyboardBackspaceIcon />}>
                    Back
                </Button>
                <h1 className='g-c-one'>Edit Song</h1>
            </Stack>
            <div className='g-c-one'>
                <EditSongContentsContainer/>
            </div>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to go back? All changes will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>
                        Continue Editing
                    </Button>
                    <Button onClick={handleConfirmedBack} autoFocus>
                        Go Back
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

