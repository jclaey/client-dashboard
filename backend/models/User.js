import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema

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
    contacts: [{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            streetAddressOne: String,
            streetAddressTwo: String,
            city: String,
            state: String,
            postalCode: String
        },
        email: String,
        phoneNumber: {
            mobile: String,
            work: String,
            home: String
        },
        policies: [
            {
                company: String,
                type: String,
                name: String,
                activeDate: Date,
                expiryDate: Date
            }
        ],
        image: {
            path: String,
            filename: String
        }
    }],
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