import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {nameToId} from "../../helpers/textHelpers";
import SongItem from "./SongItem";
import {getAllAlbums, getSongsByAlbumId} from "../../helpers/dataStoreHelpers";

export default function AlbumSection(props) {
    const {album} = props
    const [expanded, setExpanded] = useState(false)
    const [songs, setSongs] = useState([])



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

    return (
        <Accordion expanded={expanded} onChange={handleToggleExpand}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${nameToId(album.name)}-content`}
                id={`panel-${nameToId(album.name)}-header`}
            >
                <Checkbox/>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {album.name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {songs.map(song => {
                    return <SongItem song={song}/>
                })}
            </AccordionDetails>
        </Accordion>
    );
}

