import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Autocomplete, createFilterOptions, Snackbar, TextField} from "@mui/material";
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
import {useRecoilState} from "recoil";
import {editingSongName} from "../../state/atoms/editingSongName";
import SongSelect from "../AdminPage/SongSelect";
import {selectedEditSongId} from "../../state/atoms/selectedEditSongId";

export default function AdminPage(props) {
    const {} = props
    const [songList, setSongList] = useState([])
    const [selectedSongId, setSelectedSongId] = useRecoilState(selectedEditSongId)
    const [lyricsValue, setLyricsValue] = useState('');
    const [albumName, setAlbumName] = useState('')


    async function updateSongList() {
        const songs = await getAllSongs()
        setSongList(songs);

    }

    return (
        <div style={{gridColumn: '1 / -1', padding: '40px'}}>

            <h1>Add or Edit</h1>
            <SongSelect/>

            {selectedSongId && <SongCreateEditForm
                songList={songList}
                albumName={albumName}
                setAlbumName={setAlbumName}
                lyrics={lyricsValue}
                setLyrics={setLyricsValue}
            />}
        </div>
    );
}

