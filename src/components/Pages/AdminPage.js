import React, {useEffect, useMemo, useState} from 'react';
import {
    Stack,
    Step, StepButton, StepLabel,
    Stepper,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import {
    createNewAlbum,
    getAlbumsByName,
    getAllSongs,
    getSongsByAlbumId,
    createNewSong
} from "../../helpers/dataStoreHelpers";
import SongCreateEditForm from "../SongCreate/SongCreateEditForm";
import {DataStore} from "aws-amplify";
import {Album, Song} from "../../models";
import {useRecoilState, useRecoilValue} from "recoil";
import {editingSongName} from "../../state/atoms/editingSongName";
import SongSelect from "../AdminPage/SongSelect";
import {selectedEditSongId} from "../../state/atoms/selectedEditSongId";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import ArtistSelect from "../AdminPage/ArtistSelect";
import EditSong from "../AdminPage/EditSong";
import {addStep} from "../../state/atoms/addStep";

export default function AdminPage(props) {
    const {} = props
    const [songList, setSongList] = useState([])
    const [selectedSongId, setSelectedSongId] = useRecoilState(selectedEditSongId)
    const [lyricsValue, setLyricsValue] = useState('');
    const [albumName, setAlbumName] = useState('')
    const editingSongNameState = useRecoilValue(editingSongName);
    const [activeStep, setActiveStep] = useRecoilState(addStep)

    async function updateSongList() {
        const songs = await getAllSongs()
        setSongList(songs);
    }

    function handleBackToEdit() {
        setSelectedSongId(undefined)
    }

    const steps = [
        {
            id: 'selectArtist',
            label: 'Artist',
            optional: false,
            skipped: false,
            component: <ArtistSelect/>
        },
        {
            id: 'selectSong',
            label: 'Song Name',
            optional: false,
            skipped: false,
            component: <SongSelect/>
        },
        {
            id: 'editSong',
            label: 'Edit Song',
            optional: false,
            skipped: false,
            component: <EditSong/>
        }
    ]

    function handleStepClick(index) {
        setActiveStep(index)
    }

    const stackStyles = {
        padding: '40px',
        gridColumn: '1 / -1',
        background: 'var(--background-color)'
    }

    return (
        <Stack direction='column' spacing={4} sx={stackStyles}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (step.optional) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (step.skipped) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={step.label} {...stepProps}>
                            <StepButton color="inherit" onClick={() => handleStepClick(index)}>
                                {step.label}
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
            {steps[activeStep].component}
        </Stack>
    );
}

