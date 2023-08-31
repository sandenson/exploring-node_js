const mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 12

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        index: { unique: true },
        minlength: 3,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        index: { unique: true },
        validate: {
            validator: async (value) => !(await Joi.string().email().validateAsync(value)).error,
            message: (props) => `${props.value} is not a valid email address!`
        },
    },
    password: {
        type: String,
        require: true,
        trim: true,
        index: { unique: true },
        minlength: 8,
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const hash = await bcrypt.hash(this.password, SALT_ROUNDS)
        this.password = hash
        return next()
    } catch (err) {
        return next(err)
    }
})

UserSchema.methods.comparePassword = async function comparePassword(candidate) {
    return bcrypt.compare(candidate, this.password)
}

module.exports = mongoose.model('User', UserSchema)
