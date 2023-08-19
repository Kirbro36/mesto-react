import { Navigate } from "react-router-dom"
import Main from "../Main/Main"
import Header from "../Header/Header"

export default function ProtectedRoute({ loggedIn, userEmail, ...props }) {
    return (
        loggedIn ? 
        <>
            <Header dataUser={userEmail} />
            <Main name='content' {...props}/>
        </>
        : <Navigate to={'/sign-in'} replace />
    )
}