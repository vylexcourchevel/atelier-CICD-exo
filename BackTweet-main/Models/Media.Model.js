import mongoose from 'mongoose'
import mongooseUniqueValidator from "mongoose-unique-validator"
const mediaSchema = new mongoose.Schema({
    id_tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true,
    },
    id_commentaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commentaire',
        required: true,
    },
    contenu: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
})
mediaSchema.plugin(mongooseUniqueValidator)
export default mongoose.model('Media', mediaSchema)