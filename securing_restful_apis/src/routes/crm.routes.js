import express from 'express'
import { loginRequired } from '../controllers/auth.controller';
import {
    addNewContact,
    deleteContact,
    getContactById,
    getContacts,
    updateContact
} from "../controllers/crm.controller";

const router = new express.Router()

router.use(loginRequired)

router.get(
    '/',
    (req, res, next) => {
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`);
        next()
    },
    getContacts
)

router.post('/', addNewContact)
    
router.get('/:contactId', getContactById)

router.put('/:contactId', updateContact)

router.delete('/:contactId', deleteContact)

export default router
