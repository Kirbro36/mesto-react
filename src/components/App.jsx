import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import PopupImage from "./PopupImage/PopupImage.jsx";
import { useState } from 'react';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setIsImagePopup] = useState(false)

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  //function handleDeleteClick() {
 // }

 function handleCardClick(card) {
  setSelectedCard(card)
  setIsImagePopup(true)
  }

  return (
    <div className="page__content">

      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />
    
      <PopupWithForm
        name = 'edit-profile'
        title = 'Редактировать профиль'
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          type="text"
          id="name-input"
          name="name"
          className="form__box form__box_input_name"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          defaultValue=""
          required=""
        />
        <span id="name-input-error" className="form__error" />
        <input
          type="text"
          id="about-input"
          name="about"
          className="form__box form__box_input_about"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          defaultValue=""
          required=""
        />
        <span id="about-input-error" className="form__error" />
      </PopupWithForm>

      <PopupWithForm
        name='add-card'
        title='Новое место'
        titleButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          type="text"
          id="title"
          name="title"
          className="form__box form__box_input_title"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
        />
        <span id="title-error" className="form__error" />
        <input
          type="url"
          id="link"
          name="link"
          className="form__box form__box_input_link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span id="link-error" className="form__error" />
      </PopupWithForm>

      <PopupWithForm
        name='edit-avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          type="url"
          id="avatar"
          name="avatar"
          className="form__box form__box_input_avatar"
          placeholder="Ссылка на аватарку"
          defaultValue=""
          required=""
        />
        <span id="avatar-error" className="form__error" />
      </PopupWithForm>

      <PopupWithForm
        name='delete'
        title='Вы уверены?'
        titleButton='Да'
      />

      <PopupImage 
      card={selectedCard}
      isOpen={isImagePopup}
      onClose={closeAllPopups}
      />

    </div>
  );
}

export default App;
