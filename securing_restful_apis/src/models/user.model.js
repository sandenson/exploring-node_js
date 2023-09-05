import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashPassword: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.hashPassword)
}

export const User = mongoose.model('User', UserSchema)
