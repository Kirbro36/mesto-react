import React from "react";

export default function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup-card ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__case" onClick={(evt => evt.stopPropagation())}>
                <img className="popup__image" 
                alt={card.name ? `Изображение ${card.name}` : "#"} 
                src={card.link ? card.link : "#"} />
                <button
                    className="popup__close popup__close_card popup__close_button_card"
                    type="button"
                    onClick={onClose}
                />
                <h2 className="popup__title">{card.name}</h2>
            </div>
        </div>
    )
}