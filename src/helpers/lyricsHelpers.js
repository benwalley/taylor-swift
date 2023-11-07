import {getSongById} from "./dataStoreHelpers";

export function createEmptyLine(lyrics, parseLyrics = true, stringify = true) {
    let id = 1;
    if(lyrics?.length) {
        for(const lyricLine of lyrics) {
            const parsedData = parseLyrics ? JSON.parse(lyricLine) : lyricLine;
            id += parsedData.id;
        }
    }
    const data = {
        id,
        content: '',
        singerType: 'main'
    }

    return stringify ? JSON.stringify(data) : data;
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
