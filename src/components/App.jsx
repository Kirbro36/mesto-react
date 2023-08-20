import { useCallback, useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import React from "react";

import Footer from './Footer/Footer.jsx';
import Header from './Header/Header.jsx';
import ImagePopup from './ImagePopup/ImagePopup.jsx';
import PopupWithForm from './PopupWithForm/PopupWithForm.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.jsx';
import SendContext from '../contexts/SendContext.js';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import ProtectedPage from './ProtectedPage/ProtectedPage.jsx';
import { authorization, registration, getUserData } from '../utils/auth.js';
import InfoTooltip from './InfoTooltip/InfoTooltip.jsx';
import DeletePopup from './DeletePopup/DeletePopup.jsx';
import Main from './Main/Main.jsx';

export default function App() {
  const navigate = useNavigate();

  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSend, setIsSend] = useState(false);
  // стейт контекста
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');

  //стейты карточки
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [deleteCard, setDeleteCard] = useState('');

  //стейт логина
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCheckToken, setIsCheckToken] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);

  //Переменная состояния попапов
  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isDeletePopupOpen ||
    isImagePopup ||
    isResultPopupOpen ||
    isSuccessful;

  const closePopup = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
    setIsDeletePopupOpen(false);
    setIsResultPopupOpen(false)
  }, []);

  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closePopupByEsc);
      return () => {
        document.removeEventListener("keydown", closePopupByEsc);
      };
    }
  }, [isOpen, closePopup]);

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then(res => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          setIsCheckToken(false)
          navigate("/");
        })
        .catch((err) => console.log(`Ошибка авторизации при повторном входе ${err}`)
        );
    } else {
      setLoggedIn(false);
      setIsCheckToken(false);
    }
  }, [navigate]);

  const handleEditProfileClick = useCallback(() => {
    setIsEditProfilePopupOpen(true);
  }, []);

  const handleAddPlaceClick = useCallback(() => {
    setIsAddPlacePopupOpen(true);
  }, []);

  const handleDeletePopupClick = useCallback((cardId) => {
    setDeleteCard(cardId);
    setIsDeletePopupOpen(true);
  }, []);

  const handleEditAvatarClick = useCallback(() => {
    setIsEditAvatarPopupOpen(true)
  }, []);

  const handleCardClick = useCallback((cardId) => {
    setSelectedCard(cardId)
    setIsImagePopup(true)
  }, [])

  useEffect(() => {
    if (loggedIn) {
      setIsLoadingCards(true);
      Promise.all([api.getInfo(), api.getCards()])
        .then(([userEmail, dataCard]) => {
          setCurrentUser(userEmail);
          setCards(dataCard);
          setIsLoadingCards(false);
        })
        .catch((error) => console.error(`Ошибка редактирования ${error}`));
    }
  }, [loggedIn]);

  const handleSubmit = useCallback(
    (request, textError) => {
      setIsSend(true);
      request()
        .then(closePopup)
        .catch((err) => console.error(`${textError} ${err}`))
        .finally(() => setIsSend(false));
    },
    [closePopup]
  );

  const handleSubmitDelete = useCallback((evt) => {
    evt.preventDefault()
    function makeRequest() {
      return api.removeCard(deleteCard).then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCard;
          })
        );
      });
    }
    handleSubmit(makeRequest, "Ошибка при удалении карточки");
  }, [cards, deleteCard, handleSubmit]);

  const handleUpdateUser = useCallback(
    (userEmail) => {
      function makeRequest() {
        return api.setUserInfo(userEmail).then((res) => {
          setCurrentUser(res);
        });
      }
      handleSubmit(makeRequest, "Ошибка при редактировании профиля");
    },
    [handleSubmit]
  );

  const handleUpdateAvatar = useCallback(
    (userEmail) => {
      function makeRequest() {
        return api.setNewAvatar(userEmail).then((res) => {
          setCurrentUser(res);
        });
      }
      handleSubmit(makeRequest, "Ошибка при редактировании аватара");
    },
    [handleSubmit]
  );

  const handleAddCard = useCallback(
    (dataCard) => {
      function makeRequest() {
        return api.addCard(dataCard).then((res) => {
          setCards([res, ...cards]);
        });
      }
      handleSubmit(makeRequest, "Ошибка при добавлении карточки");
    },
    [cards, handleSubmit]
  );

  const handleLike = useCallback(
    (card) => {
      const isLike = card.likes.some(element => currentUser._id === element._id);
      if (isLike) {
        api
          .removeLike(card._id)
          .then((res) => {
            setCards((cards) => cards.map((item) => item._id === card._id ? res : item));
          })
          .catch((error) => console.error(`Ошибка при снятии лайка ${error}`));
      } else {
        api.addLike(card._id)
          .then(res => {
            setCards((cards) => cards.map((item) => (item._id === card._id ? res : item))
            );
          })
          .catch((error) => console.error(`Ошибка при установке лайка ${error}`)
          );
      }
    },
    [currentUser._id]
  );

  function handleLogin(password, email) {
    setIsSend(true);
    authorization(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        window.scrollTo(0, 0);
        navigate("/");
      })
      .catch((error) => {
        setIsResultPopupOpen(true);
        setIsSuccessful(false);
        console.error(`Ошибка при авторизации ${error}`);
      })
      .finally(() => setIsSend(false));
  }

  function handleRegister(password, email) {
    setIsSend(true);
    registration(password, email)
      .then(() => {
        setIsResultPopupOpen(true);
        setIsSuccessful(true);
        window.scrollTo(0, 0);
        navigate("/sign-in");
      })
      .catch((error) => {
        setIsResultPopupOpen(true)
        setIsSuccessful(false);
        console.error(`Ошибка при регистрации ${error}`);
      })
      .finally(() => setIsSend(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <SendContext.Provider value={isSend}>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                element={ProtectedPage}
                userEmail={userEmail}
                openProfile={handleEditProfileClick}
                openCard={handleAddPlaceClick}
                openAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                openDelete={handleDeletePopupClick}
                cards={cards}
                isLoading={isLoadingCards}
                onCardLike={handleLike}
                loggedIn={loggedIn}
                isCheckToken={isCheckToken}
              />
            }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Header name="signup" />
                  <Main name="signup" isCheckToken={isCheckToken} handleRegister={handleRegister} />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Header name="signin" />
                  <Main name="signin" isCheckToken={isCheckToken} handleLogin={handleLogin} />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SendContext.Provider>

        <Footer />

        <SendContext.Provider value={isSend}>
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closePopup}
            isSend={isSend}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closePopup}
            isSend={isSend}
            onAddPlace={handleAddCard}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closePopup}
            isSend={isSend}
          />

          <DeletePopup
            onClose={closePopup}
            isOpen={isDeletePopupOpen}
            onSubmit={handleSubmitDelete}
          />
        </SendContext.Provider>

        <PopupWithForm
          name="delete-popup"
          title="Вы уверены?"
          titleButton="Да "
          onClose={closePopup}
          isOpen={isDeletePopupOpen}
          onSubmit={handleSubmitDelete}
          isSend={isSend}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closePopup}
        />

        <InfoTooltip
          name="result"
          isSuccessful={isSuccessful}
          isOpen={isResultPopupOpen}
          onClose={closePopup}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}