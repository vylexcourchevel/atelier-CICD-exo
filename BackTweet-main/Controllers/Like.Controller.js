// like.controller.js
import Like from '../models/Like.Model.js';


// Créer un like
export const createLike = async (req, res) => {
    try {
      const { id_user, id_tweet } = req.body;
  
      const like = new Like({ id_user, id_tweet });
      await like.save();
  
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Like un tweet
  export const likeTweet = async (req, res) => {
    try {
      const { id_user, id_tweet } = req.body;
  
      const existingLike = await Like.findOne({ id_user, id_tweet });
      if (existingLike) {
        return res.status(400).json({ message: 'User already liked this tweet' });
      }
  
      const like = new Like({ id_user, id_tweet });
      await like.save();
  
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Unlike un tweet
  export const unlikeTweet = async (req, res) => {
    try {
      const { id_user, id_tweet } = req.body;
  
      const like = await Like.findOneAndDelete({ id_user, id_tweet });
  
      if (!like) {
        return res.status(404).json({ message: 'Like not found' });
      }
  
      res.status(200).json({ message: 'Like removed' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Mettre à jour un like
  export const updateLike = async (req, res) => {
    try {
      const { id } = req.params;
      const { id_user, id_tweet } = req.body;
  
      const updatedLike = await Like.findByIdAndUpdate(id, { id_user, id_tweet }, { new: true });
  
      if (!updatedLike) {
        return res.status(404).json({ message: 'Like not found' });
      }
  
      res.status(200).json(updatedLike);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };