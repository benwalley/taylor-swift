import React, {useEffect, useState} from 'react';
import LyricLineInput from "./LyricLineInput";
import {useRecoilState} from "recoil";
import {EditingLyricLines} from "../../state/atoms/EditingLyricLines";

export default function LyricsContainer(props) {
    const {} = props
    const [lyricLines, setLyricLines] = useRecoilState(EditingLyricLines)

    return (
        <div>
            {lyricLines.map((line, index) => {
                return <LyricLineInput key={line.id} id={line.id} index={index} lineContents={line.content}/>
            })}
        </div>
    );
}

