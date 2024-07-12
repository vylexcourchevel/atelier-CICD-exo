import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const tweetSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contenu: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


tweetSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Tweet', tweetSchema);
