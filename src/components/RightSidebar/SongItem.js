import React, {useEffect, useState} from 'react';
import {Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {nameToId} from "../../helpers/textHelpers";

export default function SongItem(props) {
    const {song} = props
    const [checked, setChecked] = useState(false)

    function handleToggle() {
        setChecked(!checked)
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
                        checked={checked}
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

