import React, {useEffect, useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {createNewSong, getAllSongs, getSongsByName} from "../helpers/dataStoreHelpers";
import {useRecoilState} from "recoil";
import {editingSongName} from "../state/atoms/editingSongName";
import {selectedEditSongId} from "../state/atoms/selectedEditSongId";
import {SongListVersion} from "../state/atoms/versions/SongListVersion";

export default function SelectOrCreateDropdown(props) {
    const {} = props
    const [nameValue, setNameValue] = useRecoilState(editingSongName);
    const [songList, setSongList] = useState([])
    const [selectedSongId, setSelectedSongId] = useRecoilState(selectedEditSongId);
    const [songListVersion, setSongListVersion] = useRecoilState(SongListVersion)

    useEffect(() => {
        updateSongList();
    }, [songListVersion]);

    async function updateSongList() {
        const songs = await getAllSongs()
        setSongList(songs);
    }

    function handleSubmitAutocomplete(e) {
        e.preventDefault();
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
        let isExistingSong = false;
        const existingSongs = await getSongsByName(name);
        if(existingSongs.length > 0) {
            isExistingSong = true;
            newValue = existingSongs[0]
        }
        if (isExistingSong) {
            // this means it is an existing song;
            setNameValue(name);
        } else {
            setNameValue(name);
        }

        if (isExistingSong) {
            setSelectedSongId(newValue.id);
        } else {
            const newSongData = await createNewSong(name);
            setSelectedSongId(newSongData?.id)
            await updateSongList();
        }
    }

    function handleTextChange(e) {
        setNameValue(e.target.value);
        if(selectedSongId !== undefined) {
            setSelectedSongId(undefined);
        }
    }

    function handleFilterOptions(options, params) {
        const filtered = options.filter(song => {
            return song.name.toLowerCase().indexOf(params.inputValue.toLowerCase()) > -1;
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
                id="select-song"
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
                options={songList.map((option) => option)}
                renderInput={(params) => {
                    return <TextField value={nameValue} onChange={handleTextChange}
                                      {...params}
                                      label="Search for a song or add a new one"
                    />
                }}
                renderOption={(props, option) => {
                    return <li key={option.id} {...props}>{option.name}</li>
                }}
            />
            {nameValue && nameValue.length > 0 && <Button variant='contained' onClick={(e) => handleSelectChange(e, nameValue)} type='contained'>{`Edit ${nameValue}`}</Button>}
        </form>
    );
}

