import express from 'express'
import { login, register } from '../controllers/auth.controller'

const router = new express.Router()

router.post('/register', register)

router.get('/login', login)

export default router
