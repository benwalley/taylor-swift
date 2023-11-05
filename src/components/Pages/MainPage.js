import React, {useEffect, useState} from 'react';
import RightSidebar from "../RightSidebar/RightSidebar";
import MainContent from "../MainContent/MainContent";


export default function MainPage(props) {
    const {} = props
    return (
        <>
            <MainContent/>
            <RightSidebar/>
        </>
    );
}

