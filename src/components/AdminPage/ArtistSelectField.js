import React, {useEffect, useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {useRecoilState} from "recoil";
import {
    createNewArtist,
    getAllArtists,
    getArtistsByName,
} from "../../helpers/dataStoreHelpers";
import CreateOptionDialog from "./CreateOptionDialog";
import {addStep} from "../../state/atoms/addStep";
import {selectedEditArtistId} from "../../state/atoms/selectedEditArtistId";
import {ArtistListVersion} from "../../state/atoms/versions/ArtistListVersion";

export default function ArtistSelectField(props) {
    const {} = props
    const [nameValue, setNameValue] = useState('');
    const [artistList, setArtistList] = useState([])
    const [selectedArtistId, setSelectedArtistId] = useRecoilState(selectedEditArtistId);
    const [artistListVersion, setArtistListVersion] = useRecoilState(ArtistListVersion)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [activeStep, setActiveStep] = useRecoilState(addStep)

    useEffect(() => {
        updateArtistList();
    }, [artistListVersion]);

    function goToNextStep() {
        setActiveStep(activeStep + 1)
    }

    async function updateArtistList() {
        const artists = await getAllArtists()
        setArtistList(artists);
    }

    function handleSubmitAutocomplete(e) {
        e.preventDefault();
        handleSelectChange(e, nameValue)
    }

    async function handleSelectChange(e, newValue) {
        let name = '';
        if(typeof newValue === 'string') {
            name = newValue;
        } else if (newValue?.name) {
            name = newValue.name;
        }
        if(name === '') {
            return;
        }
        let isExistingArtist = false;
        const existingArtists = await getArtistsByName(name);
        if(existingArtists.length > 0) {
            isExistingArtist = true;
            newValue = existingArtists[0]
        }

        setNameValue(name);

        if (isExistingArtist) {
            setSelectedArtistId(newValue.id);
            goToNextStep();
        } else {
            setDialogOpen(true)
        }
    }

    async function afterCreateNewArtist(name) {
        const newArtistData = await createNewArtist({name});
        setSelectedArtistId(newArtistData?.id)
        await updateArtistList();
        goToNextStep()
    }

    function handleTextChange(e) {
        setNameValue(e.target.value);
        if(selectedArtistId !== undefined) {
            setSelectedArtistId(undefined);
        }
    }

    function handleFilterOptions(options, params) {
        const filtered = options.filter(artist => {
            return artist.name.toLowerCase().indexOf(params.inputValue.toLowerCase()) > -1;
        })

        return filtered;
    }

    const formStyles = {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
    }

    return (
        <form onSubmit={handleSubmitAutocomplete} style={formStyles}>
            <Autocomplete
                id="select-artist"
                value={nameValue}
                onChange={(e, newValue) => {
                    handleSelectChange(e, newValue)
                }}
                filterOptions={(options, params) => {
                    return handleFilterOptions(options, params);
                }}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Regular option
                    return option.name;
                }}
                freeSolo
                selectOnFocus
                handleHomeEndKeys
                options={artistList.map((option) => option)}
                renderInput={(params) => {
                    return <TextField value={nameValue} onChange={handleTextChange}
                                      {...params}
                                      label="Search for an artist or add a new one"
                    />
                }}
                renderOption={(props, option) => {
                    return <li key={option.id} {...props}>{option.name}</li>
                }}
            />
            <CreateOptionDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                headingText={"Add Artist"}
                secondaryText={"We don't have this artist in our database yet. Would you like to add it?"}
                newName={nameValue}
                saveButtonText='Add'
                afterSubmit={(name) => afterCreateNewArtist(name)}
                textFieldName='Artist or Band Name'
            />
            {/*{nameValue && nameValue.length > 0 && <Button variant='contained' onClick={(e) => handleSelectChange(e, nameValue)} type='contained'>{`Edit ${nameValue}`}</Button>}*/}
        </form>
    );
}

