import React, {useEffect, useState} from 'react';
import {CircularProgress, IconButton, Paper, Stack} from "@mui/material";

import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer} from 'recharts';
import {useRecoilState} from "recoil";
import {SelectedDisplayWordDetails} from "../../state/atoms/SelectedDisplayWordDetails";

const datsa = [
    { name: 'Song1', WordCount: 12 },
    { name: 'Song2', WordCount: 19 },
    { name: 'Song31', WordCount: 3 },
    { name: 'Song32', WordCount: 3 },
    { name: 'Song33', WordCount: 3 },
    { name: 'Song43', WordCount: 3 },
    { name: 'Song35', WordCount: 3 },
    { name: 'Song36', WordCount: 3 },
    { name: 'Son4g3', WordCount: 3 },
    { name: 'Song43', WordCount: 3 },
    { name: 'So6ng3', WordCount: 3 },
    { name: 'Son45g3', WordCount: 3 },
    { name: 'So7ng3', WordCount: 3 },
    { name: 'So8ng3', WordCount: 3 },
    { name: 'Song4', WordCount: 5 },
    { name: 'Song5', WordCount: 2 },
];

const containerLoadingStyles = {
    padding: '100px',
    textAlign: 'center',
}

export default function WordInSongs(props) {
    const {data} = props
    const [loading, setLoading] = useState(true)
    const [selectedWords, setSelectedWords] = useRecoilState(SelectedDisplayWordDetails)

    function handleBarClick(itemData) {
        console.log(itemData)
        setSelectedWords(itemData)
    }

    useEffect(() => {
        if(data) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [data]);

    return (
        <Paper sx={loading ? containerLoadingStyles : {minWidth: '200px'}}>
            {loading ? <CircularProgress size={100} thickness={2} /> : <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide={true} onClick={(t) => console.log(t)}/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="WordCount" fill="#8884d8" onClick={handleBarClick} cursor="pointer"/>
                </BarChart>
            </ResponsiveContainer>
            }
        </Paper>
    );
}

