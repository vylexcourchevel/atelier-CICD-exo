import React, { useState } from 'react';
import axios from 'axios'; // Ajout de l'import d'axios
import { URL } from '../utils/constant/URL';
import '../src/App.css'

const Inscription: React.FC = () => {
  const [user, setUser] = useState({
    lastName:'',
    firstName:'',
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post(URL.SIGNUP, user); // Utilisation de axios avec une URL définie
      console.log(response);
    } catch (error) {
      setErrorMessage(error.response);
    }
  };

  const { firstName, lastName, email, password } = user;

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder='nom'
        />
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder='prénom'
        />
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder='email'
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder='mot de passe'
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder='confirmer votre mot de passe'
        />
        <button type="submit">S'inscrire</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>} {/* Affichage de l'erreur si elle existe */}
    </div>
  );
};

export default Inscription;
