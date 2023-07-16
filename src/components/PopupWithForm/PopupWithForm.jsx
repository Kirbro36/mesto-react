export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    className="popup__close popup__close_profile popup__close_button_profile"
                    type="button" onClick={onClose}
                />
                <form
                    action="#" className="form form-profile" name={"name"} noValidate="">
                    <h2 className={"form__title"}>{title}</h2>
                    {children}
                    <button
                        className="form__save form__save_button_profile"
                        type="submit"
                        name="form__save">
                        {titleButton || 'Сохранить'}
                    </button>
                </form>
            </div>
        </div>
    )
}