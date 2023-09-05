import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized user' })
    }
}

export const register = async (req, res) => {
    try {
        const newUser = new User(req.body)
        newUser.hashPassword = await bcrypt.hash(req.body.password, 12)
        
        const saved = await newUser.save()
        saved.hashPassword = undefined

        res.send(saved)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })

        if (!user) {
            req.status(401).json({
                message: 'Authentication failed. No user found.'
            })
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({
                    message: 'Authentication failed. No password.'
                })
            } else {
                return res.json({
                    token: jwt.sign({
                        email: user.email,
                        username: user.username,
                        _id: user._id
                    }, process.env.JWT_SECRET)
                })
            }
        }
    } catch (error) {
        throw error
    }
}
