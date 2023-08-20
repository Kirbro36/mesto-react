import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Card from "../Card/Card"
import Loading from "../Loading/Loading"
import { useContext } from "react";

export default function Homepage({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDelete, onCardLike, isLoading, cards }) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <>
            <section className="profile">
                <div className="profile__container">
                    <button
                        className="profile__avatar-button" type="button" aria-label="Сменить аватар" onClick={onEditAvatar}>
                        <img className="profile__avatar" alt="Аватар." src={currentUser.avatar ? currentUser.avatar : '#'} />
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name ? currentUser.name : ''}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                        <p className="profile__content">{currentUser.about ? currentUser.about : ''}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} />
            </section>

            <section>
                <ul className="elements">
                    {isLoading ? <Loading /> : cards.map(data => {
                        return (
                            <li className="elements__item" key={data._id}>
                                <Card card={data} onCardClick={onCardClick} onDelete={onDelete} onCardLike={onCardLike} />
                            </li>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}