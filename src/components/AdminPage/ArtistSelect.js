import React, {useEffect, useState} from 'react';
import ArtistSelectField from "./ArtistSelectField";

export default function ArtistSelect(props) {
    const {} = props
    return (
        <div className='theme-two-column'>
            <h1 className='g-c-one'>Select The Artist</h1>
            <div className='g-c-one'>
                <ArtistSelectField/>
            </div>
            <div className='g-c-two g-r-one'>

            </div>
        </div>
    );
}

