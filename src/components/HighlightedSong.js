import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {SelectedDisplayWordDetails} from "../state/atoms/SelectedDisplayWordDetails";
import {DataStore} from "aws-amplify";
import {Song} from "../models";

export default function HighlightedSong(props) {
    const {} = props
    const [selectedWords, setSelectedWords] = useRecoilState(SelectedDisplayWordDetails)
    const [songData, setSongData] = useState({})

    async function updateSongData() {
        const song = await DataStore.query(Song, selectedWords.id);
        setSongData(song);
    }

    useEffect(() => {
        updateSongData();
    }, [selectedWords]);

    const highlightedLyrics = () => {
        if(!songData?.lyrics) return '';
        let lyrics = songData.lyrics;
        return highlightString(lyrics, selectedWords.indexes)
    }

    function highlightString(str, highlights) {
        let result = '';
        let lastIndex = 0;

        for (let { startIndex, length } of highlights) {
            result += str.substring(lastIndex, startIndex);
            result += '<span class="green">';
            result += str.substring(startIndex, startIndex + length);
            result += '</span>';

            lastIndex = startIndex + length;
        }

        result += str.substring(lastIndex);

        return <div dangerouslySetInnerHTML={{ __html: result }}/>
    }


    return (
        <div>
            <h2>{selectedWords?.name}</h2>
            <div className="highlightedLyrics">
                {highlightedLyrics()}
            </div>

        </div>
    );
}

