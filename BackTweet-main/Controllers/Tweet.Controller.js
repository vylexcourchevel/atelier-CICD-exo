// tweet.controller.js
import Tweet from '../models/Tweet.Model.js';
import { io } from '../Services/Socket.js';

// Créer un tweet
export const createTweet = async (req, res) => {
  try {
    const { id_user, contenu } = req.body;


    if (!id_user || !contenu) {
      console.log("dans if");
      return res.status(400).json({ message: 'User ID and content are required' });
    }

   // const tweet = new Tweet({ id_user, contenu });
    //await tweet.save();
    const tweet = await Tweet.create({ id_user, contenu });
    console.log("après create ");


    io.emit("newTweet", tweet);

    console.log("avant res statut ");
    res.status(201).json(tweet);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Obtenir tous les tweets
export const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate('id_user', 'firstName lastName');
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un tweet par ID
export const getTweetById = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findById(id).populate('id_user', 'firstName lastName');

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un tweet
export const updateTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenu } = req.body;

    const tweet = await Tweet.findByIdAndUpdate(id, { contenu }, { new: true });

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    io.emit("updateTweet", tweet);

    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un tweet
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findByIdAndDelete(id);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    res.status(200).json({ message: 'Tweet deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
