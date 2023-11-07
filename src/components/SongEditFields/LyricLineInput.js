import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {IconButton, TextField, ToggleButton, ToggleButtonGroup, Tooltip} from "@mui/material";
import {useRecoilState} from "recoil";
import {EditingLyricLines} from "../../state/atoms/EditingLyricLines";
import {EditingLyricLineId} from "../../state/atoms/EditingLyricLineId";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {filterStringToAllowableCharacters} from "../../helpers/textHelpers";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import {createEmptyLine} from "../../helpers/lyricsHelpers";

const containerStyles = {
    padding: '2px',
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    flexWrap: 'wrap'
}

const inputStyles = {
    padding: '5px',
    width: '100%',
    maxWidth: '700px',
    letterSpacing: '0.5px',
    fontFamily: 'Roboto',
    border: '1px solid lightgrey',
}

const indexStyles = {
    margin: 0,
    fontFamily: 'roboto'
}

export default function LyricLineInput(props) {
    const {index, lineData, songData, updateLineData, deleteLine, addLine} = props



    function handleChange(e) {
        const inputValue = e.target.value;
        const filteredValue = filterStringToAllowableCharacters(inputValue);
        const updatedLine = {
            id: lineData.id,
            singerType: lineData.singerType,
            content: filteredValue
        }

        updateLineData(updatedLine)
    }

    function handleChangeSingerType(e, newSingerType) {
        const updatedLine = {
            id: lineData.id,
            singerType: newSingerType,
            content: lineData.content
        }

        updateLineData(updatedLine)
    }

    return (
        <div style={containerStyles}>
            <p style={indexStyles}>{index}</p>
            <input style={inputStyles} type="text" value={lineData.content} onChange={handleChange}/>
            <Tooltip title="Add new line after this one.">
                <IconButton color={'primary'} onClick={addLine} sx={{padding: 0}}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Remove this line">
                <IconButton color={'error'} onClick={deleteLine} sx={{padding: 0}}>
                    <RemoveCircleOutlineIcon/>
                </IconButton>
            </Tooltip>
            <ToggleButtonGroup
                color='primary'
                value={lineData.singerType || 'main'}
                exclusive
                onChange={handleChangeSingerType}
                aria-label="text alignment"
                size={'small'}
            >

                    <ToggleButton value="main" aria-label="Main Singer" sx={{padding: '0 5px'}}>
                        <Tooltip title="Main Singer">
                            <PersonIcon />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="background" aria-label="Background Singer" sx={{padding: '0 5px'}}>
                        <Tooltip title="Backup Singer(s)">
                            <GroupsIcon />
                        </Tooltip>
                    </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}

