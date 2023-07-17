import { useEffect, useState } from "react"
import api from "../../utils/api"
import Card from "../Card/Card.jsx"

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setUserName] = useState('')
    const [userDescription, setUserDescription] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([])

    useEffect(() => {
        Promise.all([api.getInfo(), api.getCards()])
            .then(([dataUser, dataCards]) => {
                setUserName(dataUser.name)
                setUserDescription(dataUser.about)
                setUserAvatar(dataUser.avatar)
                dataCards.forEach(data => data.myid = dataUser._id);
                setCards(dataCards)
            })
            .catch(error => console.error(`Ошибка при создании начальных данных ${error}`))
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <button
                        className="profile__avatar-button" type="button" aria-label="Сменить аватар" onClick={onEditAvatar}>
                        <img className="profile__avatar" alt="Аватар." src={userAvatar} />
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                        <p className="profile__content">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} />
            </section>
            <section>
                <ul className="elements">
                    {cards.map(data => {
                        return (
                            <li className="elements__item" key = {data._id}>
                                <Card card={data} onCardClick={onCardClick}/>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}