import { useContext } from "react";
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import LikeButton from "../LikeButton/LikeButton.jsx";

export default function Card({ card, onCardClick, onDelete }) {
    const currentUser = useContext(CurrentUserContext)
    return (
            <article className="elements__list">
                {currentUser._id === card.owner._id && <button className="elements__remove" type="button" onClick={() => onDelete(card._id)}/>}
                <img className="elements__image" 
                alt={`Изображение ${card.name}`} 
                src={card.link} 
                onClick={() => onCardClick({link: card.link, name: card.name})}/>
                <div className="elements__group">
                    <h2 className="elements__title">{card.name}</h2>
                    <LikeButton likes={card.likes} myid={currentUser._id} cardid={card._id}/>
                </div>
            </article>
    )
}