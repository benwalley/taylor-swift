import React, {useEffect, useState} from 'react';
import LyricLineInput from "./LyricLineInput";
import {useRecoilState} from "recoil";
import {EditingLyricLines} from "../../state/atoms/EditingLyricLines";
import {selectedEditSongId} from "../../state/atoms/selectedEditSongId";
import {DataStore} from "aws-amplify";
import {Song} from "../../models";
import {updateSong} from "../../helpers/dataStoreHelpers";
import {EditingLyricLineId} from "../../state/atoms/EditingLyricLineId";
import {createEmptyLine} from "../../helpers/lyricsHelpers";

export default function LyricsContainer(props) {
    const {} = props
    const [songId, setSongId] = useRecoilState(selectedEditSongId)
    const [songData, setSongData] = useState({});
    const [lyricsWorkingCopy, setLyricsWorkingCopy] = useState([]);
    const [lyricsChanged, setLyricsChanged] = useState(false);
    const [debounceId, setDebounceId] = useState()

    const debounceTimeout = 500;


    useEffect(() => {
        if (songId === undefined) return;
        updateData()
    }, [songId]);

    useEffect(() => {
        if(!lyricsChanged) return;
        clearTimeout(debounceId);
        const timeoutId = setTimeout(() => {
            saveLyrics();
        }, debounceTimeout)
        setDebounceId(timeoutId)
        setLyricsChanged(false);
    }, [lyricsWorkingCopy, saveLyrics, lyricsChanged, debounceId]);

    useEffect(() => {
        if(!songData) return;
        const lyrics = songData.lyrics;
        if(!lyrics?.length) return;
        const parsedData = lyrics.map(item => {
            return JSON.parse(item);
        })
        setLyricsWorkingCopy(parsedData);
    }, [songData]);

    async function saveLyrics() {
        const stringData = lyricsWorkingCopy.map(item => {
            return JSON.stringify(item);
        })
        updateSong(songId, {lyrics: stringData});
    }

    function updateLine(lineId, lineData) {
        const updatedLyrics = lyricsWorkingCopy.map(line => {
            if(line.id !== lineId) return line;
            return lineData;
        })
        setLyricsWorkingCopy(updatedLyrics);
        setLyricsChanged(true);
    }

    async function updateData() {
        const song = await DataStore.query(Song, songId);
        if(song !== undefined) {
            if(song.lyrics?.length) {
                setSongData(song);
                return;
            }
            // add an empty line to lyrics
            const emptyLine = createEmptyLine(song?.lyrics);
            const updatedSong = await updateSong(song.id, {lyrics: [emptyLine]})
            console.log(updatedSong)
        }
    }

    function handleDeleteLine(id) {
        const updatedLyrics = lyricsWorkingCopy.filter(line => {
            if(line.id === id) return false;
            return true
        })
        setLyricsWorkingCopy(updatedLyrics);
        setLyricsChanged(true);
    }

    function handleAddLine(afterId) {
        const lyricsCopy = [...lyricsWorkingCopy]
        const updatedLyrics = [];
        for (const line of lyricsCopy) {
            updatedLyrics.push(line);
            if(line.id === afterId) {
                const emptyLine = createEmptyLine(lyricsCopy, false, false);
                updatedLyrics.push(emptyLine);
            }
        }
        setLyricsWorkingCopy(updatedLyrics);
        setLyricsChanged(true);
    }

    return (
        <div>
            {lyricsWorkingCopy && lyricsWorkingCopy.map((line, index) => {
                return <LyricLineInput
                    updateLineData={(data) => updateLine(line.id, data)}
                    key={line.id}
                    index={index}
                    songData={songData}
                    lineData={line}
                    deleteLine={() => handleDeleteLine(line.id)}
                    addLine={() => handleAddLine(line.id)}/>
            })}
        </div>
    );
}

