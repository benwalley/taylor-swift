import React, {useEffect, useState} from 'react';
import {Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useRecoilState} from "recoil";
import {SelectedAnalyzePhrase} from "../../state/atoms/SelectedAnalyzePhrase";
import {selectedAnalyzeType} from "../../state/atoms/selectedAnalyzeType";

export default function PhraseInSongsInput(props) {
    const {} = props
    const [phraseValue, setPhraseValue] = useRecoilState(SelectedAnalyzePhrase)
    const [analyzeType, setAnalyzeType] = useRecoilState(selectedAnalyzeType)

    function handleSubmit(e) {
        e.preventDefault();
        setAnalyzeType('phrase')
    }

    return (
        <div>
            <h2>Analyze a phrase</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField id='analyze-phrase'
                               value={phraseValue}
                               onChange={(e) => setPhraseValue(e.target.value)}
                               label="Enter multiple words to analyze"
                               variant='outlined'
                               fullWidth={true}
                               multiline={true}
                               rows={10}
                    />
                    <Button type='submit' variant='contained'>Analyze Phrase</Button>
                </Stack>
            </form>

        </div>
    );
}

