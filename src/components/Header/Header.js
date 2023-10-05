import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";


function MenuIcon() {
    return null;
}

export default function Header(props) {
    const {} = props

    const containerStyles = {
        gridColumn: '1 / -1',
        background: '#3e9ed4',
    }
    return (
        <div style={containerStyles}>
                Header
        </div>
    );
}

