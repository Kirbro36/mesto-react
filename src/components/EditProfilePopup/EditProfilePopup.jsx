import { useContext, useEffect } from "react";
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

    useEffect(() => {
        setValue("username", currentUser.name)
        setValue("about", currentUser.about)
    },[currentUser, setValue])

    function resetForClose() {
        onClose() 
        reset({ username: currentUser.name, about: currentUser.about})
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({ username: values.username, about: values.about }, reset)
    }

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={resetForClose}
            isValid={isValid}
            isSend={isSend}
            onSubmit={handleSubmit}
        >
            <input
                name="username"
                type="text"
                id="username"
                className={`form__box form__box_input_name ${isInputValid.username === undefined || isInputValid.username ? '' : 'form__box_invalid'}`}
                placeholder="Имя"
                minLength={2}
                maxLength={40}
                required
                value={values.username ? values.username : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span className="form__error">{errors.username}</span>
            <input
                name="about"
                type="text"
                id="about"
                className={`form__box form__box_input_about ${isInputValid.about === undefined || isInputValid.about ? '' : 'form__box_invalid'}`}
                placeholder="О себе"
                minLength={2}
                maxLength={200}
                required
                value={values.about ? values.about : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span className="form__error">{errors.about}</span>
        </PopupWithForm>
    )
}