import React, {useEffect, useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {getAllAlbums, getAllSongs} from "../../helpers/dataStoreHelpers";
import {useRecoilState} from "recoil";
import {selectedEditSongId} from "../../state/atoms/selectedEditSongId";
import {DataStore} from "aws-amplify";
import {Album, Song} from "../../models";
import {editingAlbumName} from "../../state/atoms/editingAlbumName";
import {AlbumListVersion} from "../../state/atoms/versions/AlbumListVersion";

export default function AlbumSelect(props) {
    const {} = props
    const [songId, setSongId] = useRecoilState(selectedEditSongId);
    const [songData, setSongData] = useState({})
    const [albumData, setAlbumData] = useState({})
    const [albumList, setAlbumList] = useState([])
    const [albumName, setAlbumName] = useRecoilState(editingAlbumName)
    const [albumListVersion, setAlbumListVersion] = useRecoilState(AlbumListVersion)

    async function updateSongData() {
        if(!songId) return;
        const song = await DataStore.query(Song, songId);
        if(song) setSongData(song);
    }

    async function updateAlbumData() {
        if(!songData?.album) {
            setAlbumName('')
            return;
        }
        const album = await DataStore.query(Album, songData.album);
        if(album) {
            setAlbumName(album.name)
        }
    }

    useEffect(() => {
        updateSongData();
    }, [songId]);

    useEffect(() => {
        updateAlbumData();
    }, [songData]);

    useEffect(() => {
        updateAlbumList();
    }, [albumListVersion]);

    async function updateAlbumList() {
        const albums = await getAllAlbums()
        setAlbumList(albums);
    }

    function handleSelectChange(e, newValue) {
        if (newValue?.name) {
            setAlbumName(newValue.name);
        } else {
            setAlbumName(newValue);
        }
    }

    function handleTextChange(e) {
        setAlbumName(e.target.value)
    }

    function handleFilterOptions(options, params) {
        const filtered = options.filter(album => {
            return album.name.indexOf(params.inputValue) > -1;
        })

        return filtered;
    }

    return (
        <Autocomplete
            id="select-song"
            value={albumName}
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
            options={albumList.map((option) => option)}
            renderInput={(params) => {
                return <TextField value={albumName} onChange={handleTextChange} {...params} label="Search for an album or add a new one" />
            }}
            renderOption={(props, option) => {
                return <li key={option.id} {...props}>{option.name}</li>
            }}
        />
    );
}

