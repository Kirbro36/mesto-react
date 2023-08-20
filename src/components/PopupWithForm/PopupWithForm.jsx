import React from "react";

export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit, isSend, isValid = true }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
                <button
                    className="popup__close popup__close_profile popup__close_button_profile"
                    type="button" onClick={onClose}
                />
                <form className="form" name={name} noValidate onSubmit={onSubmit}>
                    <h2 className={`form__title ${name === 'delete' ? 'form__title_delete' : ''}`}>{title}</h2>
                    {children}
                    <button disabled={isSend} className={`form__save form__save_button_profile ${isValid ? '' : 'form__save_noactive'}`} type="submit">
                        {isSend ? 'Сохранение' : titleButton || 'Сохранить'}
                    </button>
                </form>
            </div>
        </div>
    )
}