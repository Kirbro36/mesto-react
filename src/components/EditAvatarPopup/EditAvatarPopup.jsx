import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import React from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSend }) {
    const input = useRef()
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({avatar: input.current.value}, reset)
    }

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            isSend={isSend}
            isValid={isValid}
            onClose={resetForClose}
            onSubmit={handleSubmit}
        >
            <input
                ref={input}
                type="url"
                id="avatar"
                name="avatar"
                className={`form__box form__box_input_avatar ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'form__box_invalid'}`}
                placeholder="Ссылка на аватарку"
                required=""
                value={values.avatar ? values.avatar : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span id="avatar-error" className="form__error">{errors.avatar}</span>
        </PopupWithForm>
    )
}