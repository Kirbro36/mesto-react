import logo from '../../images/logo.svg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import React from "react";

export default function Header({ name, dataUser }) {

    const [count, setCount] = useState(false)

    function handelClick() {
        count === false ? setCount(true) : setCount(false)
    }

    function onSignOut() {
        setCount(false);
        localStorage.removeItem('jwt')
    }

    useEffect(() => {
        function closeBurgerForResize() {
            if (document.documentElement.clientWidth > '767') {
                setCount(false);
                window.removeEventListener('resize', closeBurgerForResize)
            }
        }
        if (count === true) {
            window.addEventListener('resize', closeBurgerForResize)
            return () => window.removeEventListener('resize', closeBurgerForResize)
        }
    }, [count])

    return (
        <header className={`header header__page ${count !== false ? 'header__page_opened' : ''}`}>
            <img
                className="header__logo"
                src={logo}
                alt="Лого Место"
            />
            {name === 'signup' || name === 'signin' ?
                <Link to={name === 'signup' ? '/sign-in' : '/sign-up'} className='header__link'>
                    {name !== 'signup' ? 'Регистрация' : 'Войти'}
                </Link>
                :
                <>
                    <div className={`header__email-container ${count !== false ? 'header__email-container_opened' : ''}`}>
                        <p className='header__email'>{dataUser}</p>
                        <Link to={`/sign-in`} className='header__logout' onClick={onSignOut}>Выйти</Link>
                    </div>
                    <button className={`header__button ${count !== false ? 'header__button_active' : ''}`} onClick={handelClick}></button>
                </>
            }

        </header>
    )
}