import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {IconButton, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useRecoilState} from "recoil";
import {EditingLyricLines} from "../../state/atoms/EditingLyricLines";
import {EditingLyricLineId} from "../../state/atoms/EditingLyricLineId";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {filterStringToAllowableCharacters} from "../../helpers/textHelpers";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

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
    const {index, id, content} = props
    const [allLines, setAllLines] = useRecoilState(EditingLyricLines);
    const [lineIdCounter, setLineIdCounter] = useRecoilState(EditingLyricLineId);
    const [value, setValue] = useState('')
    const [singer, setSinger] = useState('main')
    const [singerType, setSingerType] = useState('Artist Name')

    function addNewLine() {
        const lyricLinesCopy = [...allLines];
        lyricLinesCopy.splice(index + 1, 0, {id: lineIdCounter, content: ''})
        setAllLines(lyricLinesCopy)
        setLineIdCounter(lineIdCounter + 1)
    }

    function deleteLine() {
        const lyricLinesCopy = [...allLines];
        const updatedCopy = lyricLinesCopy.filter(line => {
            return line.id !== id
        })
        setAllLines(updatedCopy)
    }

    function handleChange(e) {
        const inputValue = e.target.value;
        const filteredValue = filterStringToAllowableCharacters(inputValue);
        setValue(filteredValue)
    }

    function handleChangeSingerType(e, newSingerType) {
        setSingerType(newSingerType)
    }

    return (
        <div style={containerStyles}>
            <p style={indexStyles}>{index}</p>
            <input style={inputStyles} type="text" value={value} onChange={handleChange}/>
            <IconButton color={'primary'} onClick={addNewLine} sx={{padding: 0}}>
                <AddCircleOutlineIcon/>
            </IconButton>
            <IconButton color={'error'} onClick={deleteLine} sx={{padding: 0}}>
                <RemoveCircleOutlineIcon/>
            </IconButton>
            <ToggleButtonGroup
                color='primary'
                value={singerType}
                exclusive
                onChange={handleChangeSingerType}
                aria-label="text alignment"
                size={'small'}
            >
                <ToggleButton value="main" aria-label="Main Singer">
                    <PersonIcon />
                </ToggleButton>
                <ToggleButton value="background" aria-label="Background Singer">
                    <GroupsIcon />
                </ToggleButton>
            </ToggleButtonGroup>
            <TextField label='Singer' size={'small'} value={singer} onChange={(e) => setSinger(e.target.value)}></TextField>
        </div>
    );
}

