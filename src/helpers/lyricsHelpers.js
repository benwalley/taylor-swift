import {getSongById} from "./dataStoreHelpers";

// ids that have been used on this run of the app, because we don't want duplicate react keys if we delete and recreate rows
const forbiddenIds = []

export function createEmptyLine(config) {
    const {
        lyrics,
        parseLyrics,
        stringify
    } = config;
    const parsedLyrics = lyrics.map(lyricLine => {
        return parseLyrics ? JSON.parse(lyricLine) : lyricLine;
    })

    const data = {
        id: createId(parsedLyrics, forbiddenIds),
        content: '',
        singerType: 'main'
    }

    console.log(data.id)

    return stringify ? JSON.stringify(data) : data;
}

function createId(lyricsArray, forbiddenArray) {
    let max = Math.max(...forbiddenArray);
    for(const line of lyricsArray) {
        if(line.id > max) {
            max = line.id;
        }
    }

    const finalId = max + 1;

    forbiddenIds.push(finalId)
    return finalId;
}


export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export async function saveLine(songId, lineId, lineString) {
    const song = await getSongById(songId);
    if(!song) return;
    let lyrics;
    if(song.lyrics?.length === 0) {
        lyrics = [lineString];
    }
}
