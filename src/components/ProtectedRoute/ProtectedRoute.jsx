import { Navigate } from "react-router-dom"
import React from "react"
// import Main from "../Main/Main"
// import Header from "../Header/Header"

export default function ProtectedRoute({ element: Component, loggedIn, ...props }) {
    return (
        loggedIn ? 
        <Component {...props} />
        : <Navigate to={'/sign-in'} replace />
    )
}