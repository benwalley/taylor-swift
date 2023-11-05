import React, {useEffect, useState} from 'react';
import WordInSongs from "../AnalyticsComponents/WordInSongs";
import {IconButton, Stack} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useRecoilState} from "recoil";
import {SelectedAnalyzeWord} from "../../state/atoms/SelectedAnalyzeWord";
import {selectedAnalyzeType} from "../../state/atoms/selectedAnalyzeType";
import {analyzeWordInSongs} from "../../helpers/analyzeWords";
import {DataStore} from "aws-amplify";
import {SelectedSongIds} from "../../state/atoms/SelectedSongIds";
import {Song} from "../../models";
import useScreenSize from "../../hooks/useScreenSize";
import ShowWordsInSongs from "./ShowWordsInSongs";
import HighlightedSong from "../HighlightedSong";

export default function AnalyzeWordDisplay(props) {
    const {} = props
    const [word, setWord] = useRecoilState(SelectedAnalyzeWord)
    const [analyzeType, setAnalyzeType] = useRecoilState(selectedAnalyzeType)
    const [selectedSongIds, setSelectedSongIds] = useRecoilState(SelectedSongIds)
    const [data, setData] = useState([])
    const [format, setFormat] = useState('small')
    const screenSize = useScreenSize();

    useEffect(() => {
        if(!data) return;
        if(data.length > 100) {
            setFormat('large')
        } else {
            setFormat('small')
        }
    }, [data]);

    function sortByWordCount(a, b) {
        if (a.WordCount < b.WordCount)
            return 1;
        if (a.WordCount > b.WordCount)
            return -1;
        return 0;
    }

    function layoutType() {
        if(screenSize.width > 1400 && data.length < 100) {
            return 'small'
        }
        return 'large'
    }

    async function analyzeSongs() {
        const songArray = await getSongs(selectedSongIds)
        const songData = analyzeWordInSongs(songArray, word)
        const sortedSongData = songData.sort(sortByWordCount)
        setData([...sortedSongData])
    }

    async function getSongs(songIDs) {
        try {
            const songPromises = songIDs.map(id => DataStore.query(Song, id));
            const songs = await Promise.all(songPromises);
            return songs.filter(Boolean);  // Filters out any potential 'undefined' values
        } catch(error) {
            console.error("Error fetching songs", error);
        }
    }

    useEffect(() => {
        analyzeSongs()
    }, [selectedSongIds]);

    function handleBack() {
        setAnalyzeType('')
    }

    const contentContainerStyles = () => {
        return {
            display: 'grid',
            gridTemplateColumns: layoutType() === 'small' ? '300px 1fr' : '1fr',
        }
    }

    return (
        <div>
            <Stack direction='row'>
                <IconButton onClick={handleBack} aria-label="back">
                    <KeyboardBackspaceIcon />
                </IconButton>
                <h1>{word}</h1>
            </Stack>
            <div style={contentContainerStyles()}>
                <div></div>
                <WordInSongs data={data}/>
                <HighlightedSong/>
            </div>

        </div>
    );
}

