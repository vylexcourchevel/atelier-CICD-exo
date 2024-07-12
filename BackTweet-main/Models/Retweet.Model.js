import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const retweetSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    id_tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true,
    }
}, {
    timestamps: true
});


retweetSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('ReTweet', retweetSchema);
