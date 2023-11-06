import React, {useEffect, useState} from 'react';
import ArtistSelectField from "./ArtistSelectField";
import SongSelectField from "./SongSelectField";
import {IconButton, Stack} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {addStep} from "../../state/atoms/addStep";
import {useRecoilState} from "recoil";
import Button from "@mui/material/Button";

export default function SongSelect(props) {
    const {} = props
    const [activeStep, setActiveStep] = useRecoilState(addStep)

    function handleBack() {
        setActiveStep(activeStep - 1);
    }

    return (
        <div className='theme-two-column'>
            <Stack direction={'row'} spacing={2} margin='normal'>
                <Button onClick={handleBack} aria-label="back" startIcon={<KeyboardBackspaceIcon />}>
                    Back
                </Button>
                <h1 className='g-c-one'>Select A Song</h1>
            </Stack>
            <div className='g-c-one'>
                <SongSelectField/>
            </div>
            <div className='g-c-two g-r-one'>

            </div>
        </div>
    );
}

