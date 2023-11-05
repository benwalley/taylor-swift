import React, {useEffect, useState} from 'react';
import {Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {nameToId} from "../../helpers/textHelpers";
import {useRecoilState} from "recoil";
import {SelectedSongIds} from "../../state/atoms/SelectedSongIds";

export default function SongItem(props) {
    const {song, afterToggle} = props
    const [checked, setChecked] = useState(false)
    const [selectedSongIds, setSelectedSongIds] = useRecoilState(SelectedSongIds)

    function handleToggle() {
        if(!song?.id) return;
        const wasChecked = isChecked();
        const selectedCopy = new Set(selectedSongIds);
        if(wasChecked) {
            selectedCopy.delete(song.id);
        } else {
            selectedCopy.add(song.id);
        }
        setSelectedSongIds(Array.from(selectedCopy))
    }

    function isChecked() {
        return selectedSongIds.indexOf(song?.id) > -1
    }

    return (
        <ListItem
            key={nameToId(song.name)}
            disablePadding
        >
            <ListItemButton role={undefined} onClick={handleToggle} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={isChecked()}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': nameToId(song.name) }}
                    />
                </ListItemIcon>
                <ListItemText id={nameToId(song.name)} primary={song.name} />
            </ListItemButton>
        </ListItem>
    );
}

