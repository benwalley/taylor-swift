import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Autocomplete, Snackbar, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {
    createNewAlbum,
    createNewSong, deleteSong,
    getAlbumsByName,
    getAllAlbums,
    getAllSongs, updateSong
} from "../../helpers/dataStoreHelpers";
import {useRecoilState} from "recoil";
import {editingLyrics} from "../../state/atoms/editingLyrics";
import {editingAlbumName} from "../../state/atoms/editingAlbumName";
import {selectedEditSongId} from "../../state/atoms/selectedEditSongId";
import {DataStore} from "aws-amplify";
import {Album, Song} from "../../models";
import AlbumSelect from "../AdminPage/AlbumSelect";
import {SongListVersion} from "../../state/atoms/versions/SongListVersion";
import {editingSongName} from "../../state/atoms/editingSongName";

const buttonStyles = {
    position: 'fixed',
    bottom: 0,
    width: 'calc(100% - 80px)',
}

export default function SongCreateEditForm(props) {
    const {} = props
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [lyricsValue, setLyricsValue] = useRecoilState(editingLyrics)
    const [songId, setSongId] = useRecoilState(selectedEditSongId)
    const [songData, setSongData] = useState({})
    const [songNameValue, setSongNameValue] = useRecoilState(editingSongName);
    const [albumName, setAlbumName] = useRecoilState(editingAlbumName);
    const [songListVersion, setSongListVersion] = useRecoilState(SongListVersion)


    async function updateSongData() {
        if(!songId) return;
        const song = await DataStore.query(Song, songId);
        if(song) setSongData(song);
    }

    async function updateSongValues() {
        setLyricsValue(songData.lyrics || '');
    }

    useEffect(() => {
        updateSongData();
    }, [songId]);

    useEffect(() => {
        updateSongValues();
    }, [songData]);

    function handleCloseSnackbar() {
        setSnackbarOpen(false);
    }



    async function handleSubmit(e) {
        e.preventDefault();
        if(!songData) {
            return;
            // EDIT: Handle error
        }
        let albumId = undefined;
        if (albumName?.length) {
            const matchingAlbums = await getAlbumsByName(albumName);
            if (matchingAlbums?.length) {
                albumId = matchingAlbums[0].id;
            } else {
                const newAlbum = await createNewAlbum({name: albumName});
                albumId = newAlbum?.id;
            }
        }

        const songCreateData = {
            name: songData.name,
            lyrics: lyricsValue,
            album: albumId
        }
        await updateSong(songData.id, songCreateData);
    }

    async function handleDelete() {
        await deleteSong(songData.id);
        setSongId(undefined)
        setSongNameValue('')
        setSongListVersion(songListVersion + 1);
    }

    return (
        <form style={{display: 'block'}} onSubmit={handleSubmit}>
            <Stack direction='row' spacing={4} alignItems='center' margin={2}>
                <h2>{songData?.name}</h2>
                {songData && <Button variant='contained' onClick={handleDelete}>{`Delete ${songData.name}`}</Button>}
            </Stack>

            <Stack spacing={3}>
                <AlbumSelect/>
                <TextField
                    sx={{width: '100%'}}
                    id="outlined-lyrics"
                    label="Lyrics"
                    rows={20}
                    multiline
                    value={lyricsValue}
                    onChange={(e) => setLyricsValue(e.target.value)}
                />
                <Button style={buttonStyles} type='submit' variant='contained'>Save</Button>
            </Stack>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    );
}

