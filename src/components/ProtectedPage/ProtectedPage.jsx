import Header from "../Header/Header.jsx"
import Main from "../Main/Main.jsx"
import React from "react";


export default function ProtectedPage({ userEmail, ...props }) {
    return (
        <>
            <Header dataUser={userEmail} />
            <Main name='content' {...props} />
        </>
    )
}