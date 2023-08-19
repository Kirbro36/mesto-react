import useFormValidation from '../../utils/useFormValidation.js';
import AuthPage from '../AuthPage/AuthPage.jsx';
import React from "react";

export default function Login({ name, handleLogin }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

  function onLogin(evt) {
    evt.preventDefault()
    handleLogin(values.password, values.email)
  }

  return (
    <AuthPage name={name} onSubmit={onLogin} isValid={isValid}>

      <input
        className={`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_invalid'}`}
        name='email'
        type='email'
        placeholder={'Email'}
        value={values.email ? values.email : ''}
        onChange={handleChange}

      />
      <span className={'login__error'}>{errors.email}</span>


      <input
        className={`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_invalid'}`}
        name='password'
        type='password'
        placeholder={'Пароль'}
        minLength={3}
        value={values.password ? values.password : ''}
        onChange={handleChange}

      />
      <span className={'login__error'}>{errors.password}</span>

    </AuthPage>
  )
}