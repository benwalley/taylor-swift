import React, {useEffect, useState} from 'react';
import RightSidebar from "../RightSidebar/RightSidebar";
import App from "../../App";

export default function MainPage(props) {
    const {} = props
    return (
        <>
            <App/>
            <RightSidebar/>
        </>
    );
}

