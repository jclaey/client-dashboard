import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ContactSchema = Schema({
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
})

export const Contact = mongoose.model('Contact', ContactSchema)