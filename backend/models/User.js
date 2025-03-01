import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema
import { Contact, ContactSchema } from './Contact.js'

const UserSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contacts: [ContactSchema],
    jwtRefreshToken: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

UserSchema.methods.comparePasswords = async function(suppliedPassword) {
    return await bcrypt.compare(suppliedPassword, this.password)
}

const User = mongoose.model('User', UserSchema)

export default User