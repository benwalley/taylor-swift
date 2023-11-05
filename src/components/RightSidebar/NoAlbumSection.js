import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {nameToId} from "../../helpers/textHelpers";
import SongItem from "./SongItem";
import {getAllAlbums, getSongsByAlbumId} from "../../helpers/dataStoreHelpers";
import {useRecoilState} from "recoil";
import {SongListVersion} from "../../state/atoms/versions/SongListVersion";
import {DataStore} from "aws-amplify";
import {Album, Song} from "../../models";

export default function NoAlbumSection(props) {
    const {} = props
    const [expanded, setExpanded] = useState(false)
    const [songs, setSongs] = useState([])
    const [songListVersion, setSongListVersion] = useRecoilState(SongListVersion)


    useEffect(() => {
        updateSongList()
    }, [songListVersion]);

    async function updateSongList() {
        const songs = await DataStore.query(Song, (c) => c.album.eq(null));
        setSongs(songs);

    }

    function handleToggleExpand(e) {
        if(e.target.tagName.toLowerCase() !== "input") {
            setExpanded(!expanded)
        }
    }

    return (
        <>{songs?.length > 0 && <Accordion expanded={expanded} onChange={handleToggleExpand}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-no-album-content`}
                    id={`panel-no-album-header`}
                >
                    <Checkbox/>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        No Album Set
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {songs.map(song => {
                        return <SongItem song={song}/>
                    })}
                </AccordionDetails>
            </Accordion>}
        </>
    );
}

