// like.routes.js
import express from 'express';
import { createLike, likeTweet, unlikeTweet, updateLike } from '../Controllers/Like.Controller.js';
import { verifieToken } from '../auth.js';

const router = express.Router();

router.post('/likes', verifieToken, createLike);
router.post('/likes/like', verifieToken, likeTweet);
router.post('/likes/unlike', verifieToken, unlikeTweet);
router.put('/likes/:id',  verifieToken, updateLike);

export default router;
