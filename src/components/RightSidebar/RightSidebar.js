import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AlbumSection from "./AlbumSection";
import {getAllAlbums} from "../../helpers/dataStoreHelpers";


const sidebarContainerStyles = {
    background: '#f9f9f9',
    boxShadow: '2px 0px 8px #8080807a',
}

export default function RightSidebar(props) {
    const {} = props
    const [albumList, setAlbumList] = useState([])

    async function updateAlbumList() {
        const albums = await getAllAlbums();
        setAlbumList(albums);

    }

    useEffect(() => {
        updateAlbumList()
    }, []);


    return (
        <div style={sidebarContainerStyles}>
            <h2>Albums</h2>
            {albumList.map(album => {
                return <AlbumSection album={album}/>
            })}
        </div>
    );
}

