import { useContext } from "react";
import SendContext from '../../contexts/SendContext.js';
import React from "react";

export default function Form({ name, titleButton, children, isValid, onSubmit }) {
    const isSend = useContext(SendContext)
    return (
        <form noValidate name={name} onSubmit={onSubmit}>
            {children}
            {{login:
                    <button className={`login__submit-button ${isValid ? '' : 'login__submit-button_disable'}`}
                        disabled={isSend || !isValid}>
                        {isSend ? '' : titleButton || 'Сохранить'}
                    </button>,
                popup:
                    <button disabled={isSend} className={`form__save form__save_button_profile ${isValid ? '' : 'form__save_noactive'}`} type="submit">
                        {isSend ? 'Сохранение' : titleButton || 'Сохранить'}
                    </button>
            }[`${name === 'signin' || name === 'signup' ? 'login' : 'popup'}`]}
        </form>
    )
}