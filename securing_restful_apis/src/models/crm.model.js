import mongoose from 'mongoose'

export const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: String,
    company: String,
    phone: Number,
}, {
    timestamps: true
})

export const Contact = mongoose.model('Contact', ContactSchema)
