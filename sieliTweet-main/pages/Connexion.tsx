import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { URL } from '../utils/constant/URL';
import {useDispatch, useSelector} from  'react-redux';
import * as ACTION from '../redux/reducers/Reseau';
import { RootState } from '../interfaces/Reseau';
import { useNavigate, redirect } from 'react-router-dom';



const Connexion = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    let validation: boolean = false ;




    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setUser((user: any) => ({...user, [name]: value}));
    }

    const connexion =  (e: any) => {
        e.preventDefault();
        console.log(user);
        dispatch(ACTION.FETCH_START());
        const enregistrer = async () => {
            try {
                const response = await axios.post(URL.LOGIN, user, {withCredentials: true});
                console.log(response);
                
                 dispatch(ACTION.FETCH_SUCCES(response.data));
                 /* utiliser de préférence navigate plutot que window.location... */
                console.log("avant redirection");
                navigate("/");
                console.log(response)
    
            } catch (error: any) {
                console.log(error);
                //dispatch(ACTION.FETCH_FAILLURE());
                //if(error.response.data.mess == "user not found"){
                //    alert("utilisateur introuvable veuillez vous inscrire");
                //}
            }
        }
        enregistrer();
        
    }
    return (
    <div>
        <form onSubmit={connexion} >
                <label htmlFor="email" >Email :</label>
                <input id="email" type='email' name="email" onChange={handleChange} />
                <label htmlFor="password">Mot de passe : </label>
                <input id='password' type='password' name='password'  onChange={handleChange}/>
                <button>Connexion</button>
            </form>
    </div>
    )
}

export default Connexion