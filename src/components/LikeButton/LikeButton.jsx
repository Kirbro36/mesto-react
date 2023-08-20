import { useEffect, useState } from "react";
import React from "react";
import api from "../../utils/api.js";

export default function LikeButton({ likes, myid, cardid }) {
    const [isLiked, setIsLiked] = useState(false)
    const [count, setCount] = useState(likes.length)

    useEffect(() => {
        setIsLiked(likes.some(element => myid === element._id))
    }, [likes, myid])

    function handleLike() {
        if (isLiked) {
            api.deleteLike(cardid)
                .then(res => {
                    setIsLiked(false)
                    setCount(res.likes.length)
                })
                .catch(error => console.error(`Ошибка при создании начальных данных ${error}`))
        } else {
            api.addLike(cardid)
                .then(res => {
                    setIsLiked(true)
                    setCount(res.likes.length)
                })
                .catch(error => console.error(`Ошибка при создании начальных данных ${error}`))
        }
    }

    return (
        <div className="elements__container">
            <button className={`elements__like ${isLiked ? 'elements__like_active' : ''}`} type="button" onClick={handleLike} />
            <p className="elements__counter">{count}</p>
        </div>
    )
}