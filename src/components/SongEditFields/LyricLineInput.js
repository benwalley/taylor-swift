import React, {useEffect, useRef, useState} from 'react';
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
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    flexWrap: 'wrap'
}

const indexStyles = {
    margin: 0,
    fontFamily: 'roboto',
    width: '1.6em',
    textAlign: 'right',
    boxSizing: 'border-box',
}

export default function LyricLineInput(props) {
    const {index, lineData, updateLineData, deleteLine, addLine, splitLine} = props
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    function handleChange(e) {
        const inputValue = e.target.value;
        const filteredValue = filterStringToAllowableCharacters(inputValue);
        setLineContents(filteredValue)
    }

    function setLineContents(str) {
        console.log('setting line contents' + str);
        const updatedLine = {
            id: lineData.id,
            singerType: lineData.singerType,
            content: str
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

    function focusNextLine(caretPosition) {
        const newInput = containerRef.current.nextSibling.querySelector('input')
        newInput.focus();
        if(caretPosition) {
            setTimeout(() => {
                newInput.setSelectionRange(caretPosition, caretPosition)
            }, 0)
        }
    }

    function focusPreviousLine(caretPosition) {
        const newInput = containerRef.current.previousSibling.querySelector('input')
        if(caretPosition) {
            setTimeout(() => {
                newInput.setSelectionRange(caretPosition, caretPosition)
            }, 0)
        }
        newInput.focus();

    }

    function split_at_index(value, index)
    {
        const first = value.substring(0, index)
        const second = value.substring(index)
        return [first, second]
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            if(e.shiftKey) {
                // go to next line
                focusNextLine();
            } else {
                // TODO: copy contents after cursor onto new line
                const cursorPosition = inputRef.current.selectionStart;
                const splitStringArray = split_at_index(lineData.content, cursorPosition);
                splitLine(splitStringArray);

                setTimeout(() => {
                    const newInput = containerRef.current.nextSibling.querySelector('input')
                    newInput.focus();
                    newInput.setSelectionRange(0, 0)
                }, 0)
            }
            return;
        }
        if (e.key === 'Backspace') {
            if(e.target.value === '') {
                focusPreviousLine()
                deleteLine();
            }
        }
        if (e.key === 'ArrowUp') {
            const currentPosition = inputRef.current.selectionStart;
            focusPreviousLine(currentPosition);
        }
        if (e.key === 'ArrowDown') {
            const currentPosition = inputRef.current.selectionStart;
            focusNextLine(currentPosition);
        }

    }

    function isBackup() {
        console.log(lineData.singerType)
        return lineData.singerType === 'background';
    }

    const inputStyles = {
        padding: isBackup() ? '7px 7px 7px 20px' : '7px',
        width: '100%',
        maxWidth: '700px',
        letterSpacing: '0.5px',
        fontFamily: 'Roboto',
        border: 'none',
        height: '2.2rem',
        boxSizing: 'border-box',
        background: isBackup() ? '#f8f8f8' : 'white',
        fontSize: isBackup() ? '0.9em' : '1em',
        color: isBackup() ? '#5b5b5b' : 'black',
    }

    function inputValue() {
        return lineData.content;
    }

    return (
        <div style={containerStyles} ref={containerRef}>
            <p style={indexStyles}>{index}</p>
            <input ref={inputRef} autoFocus style={inputStyles} type="text" value={inputValue()} onKeyDown={handleKeyPress} onChange={handleChange}/>
            <Tooltip title="Add new line after this one." disableInteractive>
                <IconButton color={'primary'} onClick={addLine} sx={{padding: 0}}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Remove this line" disableInteractive>
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
                        <Tooltip title="Main Singer" disableInteractive>
                            <PersonIcon />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="background" aria-label="Background Singer" sx={{padding: '0 5px'}}>
                        <Tooltip title="Backup Singer(s)" disableInteractive>
                            <GroupsIcon />
                        </Tooltip>
                    </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}

