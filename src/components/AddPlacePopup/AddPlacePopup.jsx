import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend }) {

    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({ title: values.title, link: values.link }, reset)
    }

    return (
        <PopupWithForm
            name='add-card'
            title='Новое место'
            titleButton='Создать'
            isOpen={isOpen}
            isValid={isValid}
            isSend={isSend}
            onClose={resetForClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="title"
                name="title"
                className={`form__box form__box_input_title ${isInputValid.title === undefined || isInputValid.title ? '' : 'form__box_invalid'}`}
                placeholder="Название"
                minLength={2}
                maxLength={30}
                required=""
                value={values.title ? values.title : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span id="title-error" className="form__error">{errors.title}</span>
            <input
                type="url"
                id="link"
                name="link"
                className={`form__box form__box_input_link ${isInputValid.link === undefined || isInputValid.link ? '' : 'form__box_invalid'}`}                placeholder="Ссылка на картинку"
                required=""
                value={values.link ? values.link : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span id="link-error" className="form__error">{errors.link}</span>
        </PopupWithForm>
    )
}