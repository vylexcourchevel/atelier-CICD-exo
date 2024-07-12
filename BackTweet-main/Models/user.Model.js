import mongoose from 'mongoose'
import mongooseUniqueValidator from "mongoose-unique-validator"
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,

    }
},
{
    timestamps: true
})
userSchema.plugin(mongooseUniqueValidator)
export default mongoose.model('User', userSchema)