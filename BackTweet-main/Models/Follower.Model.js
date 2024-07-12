import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const followerSchema = new mongoose.Schema({
    id_follwer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    id_follow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});


followerSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Follower', followerSchema);
