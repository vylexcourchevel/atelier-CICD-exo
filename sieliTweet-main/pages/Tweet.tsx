import React, { useEffect, useState } from 'react'
import { Reseaux, RootState, TweetType } from '../interfaces/Reseau';
import { useSelector } from 'react-redux';
import {getUser} from '../services/selector/Reseau.selector';
import axios from 'axios';
import { URL } from '../utils/constant/URL';
import { io } from "socket.io-client";

const Tweet = () => {
    
  const socket = io("http://localhost:8080");
  const [mediaTweet, setMediaTweet] = useState([]);
  const store: Reseaux = useSelector((state: RootState) =>getUser(state));
  const [tweet , setTweet] = useState<TweetType>();
  const [tweets, setTweets] = useState<TweetType[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const {data} = await axios.get(URL.GET_TWEET, {withCredentials: true});
        console.log("data => ", data);
        setTweets(data);
        
      } catch (error) {
        console.log(error);
         
      }
    };
    fetchTweet();
    socket.on("newTweet", (newTweet: TweetType) => {
      setTweets((prevTweets) => [...prevTweets, newTweet]);
    });

    return () => {
      socket.off("newTweet");
    };

  },[]);

  


const handleChange = (e: any) => {
        const {name, value} = e.target;
        setTweet((tweet: any) => ({...tweet, [name]: value}));
}





const tweeter = async (e: value) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(store);
    const newTT =  {...tweet, ["id_user"]: store._id};
    console.log("tweet => ", newTT);
    try {
      const response = await axios.post(URL.POST_TWEET, newTT, {withCredentials: true} );
      console.log(response); 
      
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)

}



  return (
    <div>
        <form onSubmit={tweeter} >
                <label htmlFor="contenue" >Contenue :</label>
                <textarea id="contenu" name="contenu" rows="4" cols="50" onChange={handleChange}>
                </textarea>
                <button disabled={isLoading}>Tweeter</button>
        </form>
        {tweets && tweets.map((item, index) => (
        <p key={index}>
          {item._id} - {item.contenu}
        </p>
      ))}

         
    </div>
  )
}

export default Tweet