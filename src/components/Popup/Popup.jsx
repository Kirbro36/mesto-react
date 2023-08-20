import React from "react";

export default function Popup({ name, children, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className={`${name === 'image' ? 'popup__case' : 'popup__container'} ${name === 'result' ? 'popup__container_registration' : ''} `}
            onClick={(evt) => evt.stopPropagation()}>
                <button className="popup__close popup__close_profile popup__close_button_profile"
                    type="button" onClick={onClose} />
                {children}
            </div>
        </div>
    )
}