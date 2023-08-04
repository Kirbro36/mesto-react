import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

import { useCallback, useEffect, useState } from 'react';

//Стейты попапов
function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false)
  const [isSend, setIsSend] = useState(false)

  //Стейт контекста
  const [currentUser, setCurrentUser] = useState({})

  //Стейт карточки
  const [cards, setCards] = useState([])
  const [isLoadingCards, setIsLoadingCards] = useState(true)
  const [deleteCardId, setDeleteCardId] = useState('')

  const setAllStatesForClose = useCallback(() => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
    setIsDeletePopupOpen(false)
  }, [])

  const closePopupByEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setAllStatesForClose()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  }, [setAllStatesForClose])

  const closeAllPopups = useCallback(() => {
    setAllStatesForClose()
    document.removeEventListener('keydown', closePopupByEsc)
    setAllStatesForClose()
  }, [setAllStatesForClose, closePopupByEsc])

  function setEventListenerOnEsc() {
    document.addEventListener('keydown', closePopupByEsc)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListenerOnEsc()
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListenerOnEsc()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListenerOnEsc()
  }

  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId)
    setIsDeletePopupOpen(true)
    setEventListenerOnEsc()
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)
    setEventListenerOnEsc()
  }

  useEffect(() => {
    setIsLoadingCards(true)
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser)
        setCards(dataCards)
        setIsLoadingCards(false)
      })
      .catch(error => console.error(`Ошибка при создании начальных данных ${error}`))
  }, [])

  function handleDeleteSubmit(evt) {
    evt.preventDefault()
    setIsSend(true)
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        closeAllPopups()
        setIsSend(false)
      })
      .catch(error => console.error(`Ошибка при удалении карточки ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true)
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSend(false)
      })
      .catch(err => console.error(`Ошибка при редактировании профиля ${err}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true)
    api.setNewAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSend(false)
      })
      .catch(err => console.error(`Ошибка при редактировании аватара ${err}`))
      .finally(() => setIsSend(false))
  }

  function handleAddPlace(dataCard, reset) {
    setIsSend(true)
    api.addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
        setIsSend(false)
      })
      .catch(err => console.error(`Ошибка при редактировании карточки ${err}`))
      .finally(() => setIsSend(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDelete={handleDeleteClick}
          cards={cards}
          isLoading={isLoadingCards}
        />

        <Footer />

        <EditProfilePopup onUpdateUser={handleUpdateUser} isSend={isSend} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

        <AddPlacePopup onAddPlace={handleAddPlace} isSend={isSend} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>

        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isSend={isSend} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          titleButton='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteSubmit}
          isSend={isSend}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
