import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {SelectedDisplayWordDetails} from "../../state/atoms/SelectedDisplayWordDetails";

export default function ShowWordsInSongs(props) {
    const [selectedWords, setSelectedWords] = useRecoilState(SelectedDisplayWordDetails)

    const {} = props
    return (
        <div>
            {selectedWords?.indexes?.length && selectedWords.indexes.map(item => {
                return <div key={item.startIndex}>{item.fullString}</div>
            })}

        </div>
    );
}

