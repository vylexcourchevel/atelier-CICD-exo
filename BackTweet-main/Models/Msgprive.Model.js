import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const msgpriveSchema = new mongoose.Schema({
    id_destenateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    id_expedateur: {
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


msgpriveSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('MsgPrive', msgpriveSchema);
