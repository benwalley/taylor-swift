import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {useRecoilState} from "recoil";
import {CurrentEditTab} from "../../state/atoms/CurrentEditTab";
import LyricsContainer from "../SongEditFields/LyricsContainer";
import Button from "@mui/material/Button";

const contentStyles = {
    padding: '20px 0 40px'
}

const submitContainerStyles = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    left: 0,
    background: '#f2f0eb',
    boxShadow: '0px 0px 5px #00000057',
}

const submitStyles = {
    width: '100%',
}

export default function EditSongContentsContainer(props) {
    const {} = props
    const [currentEditTab, setCurrentEditTab] = useRecoilState(CurrentEditTab);

    const tabs = [
        {
            label: 'Lyrics',
            content: <LyricsContainer/>,
        },
        {
            label: 'Artists and Dates',
            content: <div>second content</div>,
        },
        {
            label: 'Additional Data',
            content: <div>third content</div>,
        }
    ]

    const handleChange = (event, newValue) => {
        setCurrentEditTab(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }



    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentEditTab}
                      onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      aria-label="secondary tabs example">
                    {tabs.map((tab, index) => {
                        return <Tab key={tab.label} label={tab.label} {...a11yProps(index)} />
                    })}
                </Tabs>
            </Box>
            <div style={contentStyles}>
                {tabs[currentEditTab].content}
            </div>
            <div style={submitContainerStyles}>
                <Button sx={submitStyles} variant='contained'>Save Song</Button>
            </div>
        </div>
    );
}

