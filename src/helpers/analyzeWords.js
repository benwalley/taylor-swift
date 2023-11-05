export function analyzeWordInSongs(songArray, word) {
    const songData = songArray.map(song => {
        const indexes = getAllInstancesOfStringInSong(song, word);
        return {
            name: song.name,
            WordCount: indexes.length,
            id: song.id,
            indexes
        }
    }).filter(item => {
        return item.WordCount > 0;
    })
    return songData
}

function getAllInstancesOfStringInSong(songData, string) {
    const returnArray = []
    const lyrics = songData?.lyrics || '';
    for(let index = 0; index < lyrics.length; index++) {
        if(isLetterOrNumber(lyrics[index])) {
            const length = matchingStringAtIndex(lyrics, string, index)
            if(length > 0) {
                returnArray.push({
                    length,
                    startIndex: index,
                    fullString: lyrics.slice(index-10, index+10)
                });
            }
        }
    }
    return returnArray;
}

function doCharactersMatch(a, b) {
    if((typeof(parseInt(a)) === 'number') && !isNaN(parseInt(a)) && (typeof(parseInt(b)) === 'number') && !isNaN(parseInt(b))) {
        return parseInt(a) === parseInt(b);
    }
    return a.toLowerCase() === b.toLowerCase();
}

function matchingStringAtIndex(haystack, needle, startIndex) {
    let haystackCounter = 0;
    for(const letter of needle) {
        let canMatchHaystackItem = false
        while(!canMatchHaystackItem) {
            const haystackChar = haystack[startIndex + haystackCounter]
            if(isLetterOrNumber(haystackChar)) {
                canMatchHaystackItem = true;
            } else {
                haystackCounter ++;
            }
        }

        if(haystack[startIndex + haystackCounter] === undefined) return -1
        if(doCharactersMatch(letter, haystack[startIndex + haystackCounter])) {
            haystackCounter++
        } else {
            return -1;
        }
    }
    return haystackCounter;
}

function isLetterOrNumber(char) {
    if(char === undefined) return true
    let re = /^[A-Za-z0-9]$/;
    return re.test(char);
}


export function wordArrayFromSong(song) {
    const wordsList = song.lyrics.replace(/[\n\r]/g, ' ') // Replace newlines with Space
        .replace(/[^a-z\d\s\']/gi, '') // Discard punctuation, except for apostrophes
        .split(' ') // Split at each Space to get array of words
        .filter(word => word !== ''); // Remove any possible empty strings from array
    return wordsList
}

export function wordArrayFromSongList(songArray) {
    const songData = songArray.map(song => {
        return wordArrayFromSong(song)
    }).flat()
    return songData
}
