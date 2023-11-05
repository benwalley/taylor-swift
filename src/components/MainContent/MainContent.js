import React, {useEffect, useState} from 'react';
import AnalyzeWordDisplay from "./AnalyzeWordDisplay";
import {useRecoilState} from "recoil";
import {selectedAnalyzeType} from "../../state/atoms/selectedAnalyzeType";
import WordInSongsInput from "../AnalyticsInputs/WordInSongsInput";
import {Divider} from "@mui/material";
import PhraseInSongsInput from "../AnalyticsInputs/PhraseInSongsInput";
import {selectedEditSongId} from "../../state/atoms/selectedEditSongId";
import {SelectedSongIds} from "../../state/atoms/SelectedSongIds";

const containerStyles = {
    padding: '20px',
    minWidth: '100px',
}

const errorTextStyles = {
    color: '#e03a3a',
}

export default function MainContent(props) {
    const {} = props
    const [analyzeType, setAnalyzeType] = useRecoilState(selectedAnalyzeType)
    const [selectedSongs, setSelectedSongs] = useRecoilState(SelectedSongIds)
    return (
        <div style={containerStyles}>
            {analyzeType === '' && <div>
                <h1>Analyze selected songs</h1>
                <Divider/>
                {(selectedSongs && selectedSongs.length > 0) ? <div>
                    <WordInSongsInput/>
                    <p>or</p>
                    <PhraseInSongsInput/>
                </div> : <h3 style={errorTextStyles}>Please select at least one song to analyze</h3>}
            </div>}

            {analyzeType === "word" && <AnalyzeWordDisplay/>}
        </div>
    );
}

