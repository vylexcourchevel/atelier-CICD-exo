import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../utils/constant/URL';
import '../src/App.css';

const Follow: React.FC = () => {
  const [userId, setUserId] = useState(''); // Id de l'utilisateur connecté
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [following, setFollowing] = useState([]); // Liste des utilisateurs suivis
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Récupérer les utilisateurs et ceux que l'utilisateur connecté suit
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(URL.USERS); // Point de terminaison pour obtenir tous les utilisateurs
        console.log(usersResponse)
        const followingResponse = await axios.get(`${URL.FOLLOW}/${userId}/following`); // Point de terminaison pour obtenir les utilisateurs suivis

        setUsers(usersResponse.data);
        setFollowing(followingResponse.data);
      } catch (error) {
        setErrorMessage('Erreur lors de la récupération des utilisateurs.');
      }
    };

    fetchData();
  }, [userId]);

  const handleFollow = async (id: string) => {
    try {
      await axios.post(`${URL.FOLLOW}/follow/${id}`, {}, { withCredentials: true }); // Ajouter l'utilisateur aux suivis
      setFollowing([...following, id]);
    } catch (error) {
      setErrorMessage('Erreur lors du suivi de l\'utilisateur.');
    }
  };

  const handleUnfollow = async (id: string) => {
    try {
      await axios.delete(`${URL.FOLLOW}/unfollow/${id}`, { withCredentials: true }); // Retirer l'utilisateur des suivis
      setFollowing(following.filter(userId => userId !== id));
    } catch (error) {
      setErrorMessage('Erreur lors du désuivi de l\'utilisateur.');
    }
  };

  return (
    <div>
      <h2>Suivre des utilisateurs</h2>
      {errorMessage && <p>{errorMessage}</p>} {/* Affichage de l'erreur si elle existe */}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.firstName} {user.lastName}
            {following.includes(user._id) ? (
              <button onClick={() => handleUnfollow(user._id)}>Ne plus suivre</button>
            ) : (
              <button onClick={() => handleFollow(user._id)}>Suivre</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Follow;
