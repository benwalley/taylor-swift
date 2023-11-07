import {DataStore} from 'aws-amplify';
import {Album, Artist, Song} from "../models";
import {createEmptyLine} from "./lyricsHelpers";

export async function createNewSong(name) {
    if(!name) return;
    const lyrics = createEmptyLine([])
    try {
        const song = await DataStore.save(
            new Song({
                name: name.toLowerCase(),
                lyrics: [lyrics],
            })
        );
        return song
    } catch (error) {

    }
}

export async function getSongById(id) {
    return await DataStore.query(Song, id);
}

export async function deleteSong(id) {
    const toDelete = await DataStore.query(Song, id);
    if(!toDelete) return false;
    await DataStore.delete(toDelete)
    return true;
}

export async function updateSong(id, data) {
    if(!id || !data) return;
    const original = await DataStore.query(Song, id);
    if(!original) return;
    const updatedSong = await DataStore.save(
        Song.copyOf(original, updated => {
            updated.name = data.name || original.name;
            updated.lyrics = data.lyrics || original.lyrics;
            updated.album = data.album || original.album;
        })
    )
    return updatedSong
}

export async function getAllSongs() {
    const songs = await DataStore.query(Song);
    return songs
}

export async function getSongsByAlbumId(id) {
    const songs = await DataStore.query(Song, (c) => c.album.eq(id));
    return songs
}

export async function getSongsByName(name) {
    if(name === '') return [];
    const songs = await DataStore.query(Song, (c) => c.name.eq(name.toLowerCase()));
    return songs
}

export async function getAllAlbums() {
    const albums = await DataStore.query(Album);
    return albums
}

export async function getAlbumsByName(name) {
    const albums = await DataStore.query(Album, (c) => c.name.eq(name.toLowerCase()));
    return albums;
}

export async function createNewAlbum(data) {
    const {name} = data
    if(!name) return;
    try {
        const album = await DataStore.save(
            new Album({
                name: name.toLowerCase()
            })
        );
        return album;
    } catch (error) {

    }
}

export async function getArtistsByName(name) {
    if(name === '') return [];
    const artists = await DataStore.query(Artist, (c) => c.name.eq(name.toLowerCase()));
    return artists
}

export async function getAllArtists() {
    const artists = await DataStore.query(Artist);
    return artists
}

export async function createNewArtist(data) {
    const {name} = data
    if(!name) return;
    try {
        const lowercaseName = name.toLowerCase() || '';
        const artist = await DataStore.save(
            new Artist({
                name: lowercaseName
            })
        );
        return artist
    } catch (error) {
        console.log(error)
    }
}
