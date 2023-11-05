import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {nameToId} from "../../helpers/textHelpers";
import SongItem from "./SongItem";
import {getAllAlbums, getSongsByAlbumId} from "../../helpers/dataStoreHelpers";
import {useRecoilState} from "recoil";
import {SelectedSongIds} from "../../state/atoms/SelectedSongIds";

export default function AlbumSection(props) {
    const {album} = props
    const [expanded, setExpanded] = useState(false)
    const [songs, setSongs] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)
    const [selectedSongIds, setSelectedSongIds] = useRecoilState(SelectedSongIds)


    useEffect(() => {
        afterToggle();
    }, [selectedSongIds]);

    useEffect(() => {
        updateSongList()
    }, [album.id]);

    async function updateSongList() {
        if(!album?.id) return;
        const songs = await getSongsByAlbumId(album.id)
        setSongs(songs);

    }

    function handleToggleExpand(e) {
        if(e.target.tagName.toLowerCase() !== "input") {
            setExpanded(!expanded)
        }
    }

    function toggleSelectAll() {
        if(songs.length === 0) return;
        const songsCopy = new Set(songs);
        const selectedCopy = new Set(selectedSongIds)
        for(const song of songsCopy) {
            if(selectedAll) {
                // deselect child
                selectedCopy.delete(song.id)
            } else {
                // select child
                selectedCopy.add(song.id)
            }
        }
        setSelectedSongIds(Array.from(selectedCopy));
        setSelectedAll(!selectedAll)
    }

    function afterToggle() {
        if(!songs?.length) return;
        const selectedCopy = new Set(selectedSongIds)
        let anyUnselected = false;
        for(const song of songs) {
            const isSongSelected = selectedCopy.has(song.id);
            if (!isSongSelected) {
                anyUnselected = true;
            }

            if(selectedAll && !isSongSelected) {
                setSelectedAll(false)
                return;
            }
        }
        if(!anyUnselected) {
            setSelectedAll(true)
        }
    }

    return (
        <Accordion expanded={expanded} onChange={handleToggleExpand}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${nameToId(album.name)}-content`}
                id={`panel-${nameToId(album.name)}-header`}
            >
                <Checkbox checked={selectedAll} onChange={toggleSelectAll}/>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {album.name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {songs.map(song => {
                    return <SongItem afterToggle={afterToggle} key={song.id} song={song}/>
                })}
            </AccordionDetails>
        </Accordion>
    );
}

