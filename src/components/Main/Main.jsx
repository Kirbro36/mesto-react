import { memo } from "react";
import React from "react";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Homepage from "../Homepage/Homepage.jsx";

const Main = memo(({ name, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards, isLoading, onCardLike, handleRegister, handleLogin }) => {

    return (
        <main className="content">
            {name === 'content' ?
                <Homepage
                    onEditProfile={onEditProfile}
                    onAddPlace={onAddPlace}
                    onEditAvatar={onEditAvatar}
                    onCardClick={onCardClick}
                    onDelete={onDelete}
                    cards={cards}
                    isLoading={isLoading}
                    onCardLike={onCardLike}
                />
                : name === 'signup' ?
                    <Register name={name} handleRegister={handleRegister} />
                    : <Login name={name} handleLogin={handleLogin} />
            }
        </main>
    )

})

export default Main;