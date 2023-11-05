import React, {useEffect, useState} from 'react';
import {Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useRecoilState} from "recoil";
import {SelectedAnalyzeWord} from "../../state/atoms/SelectedAnalyzeWord";
import {selectedAnalyzeType} from "../../state/atoms/selectedAnalyzeType";

export default function WordInSongsInput(props) {
    const {} = props
    const [wordValue, setWordValue] = useRecoilState(SelectedAnalyzeWord)
    const [analyzeType, setAnalyzeType] = useRecoilState(selectedAnalyzeType)


    function handleSubmit(e) {
        e.preventDefault();
        setAnalyzeType('word')
    }

    function handleChange(e) {
        setWordValue(e.target.value)
    }

    return (
        <div>
            <h2>Analyze a word</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField id='analyze-word'
                               value={wordValue}
                               onChange={handleChange}
                               label="Enter a word to analyze"
                               variant='outlined'
                               fullWidth={true}
                    />
                    <Button type='submit' variant='contained'>Analyze Word</Button>
                </Stack>
            </form>

        </div>
    );
}

