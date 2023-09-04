import { Contact } from '../models/crm.model'

export const addNewContact = async (req, res) => {
    let newContact = new Contact(req.body)

    try {
        res.json(await newContact.save())
    } catch (error) {
        res.send(error)
    }
}

export const getContacts = async (req, res) => {
    try {
        res.json(await Contact.find())
    } catch (error) {
        res.send(error)
    }
}

export const getContactById = async (req, res) => {
    try {
        res.json(await Contact.findById(req.params.contactId))
    } catch (error) {
        res.send(error)
    }
}

export const updateContact = async (req, res) => {
    try {
        res.json(await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
            new: true
        }))
    } catch (error) {
        res.send(error)
    }
}

export const deleteContact = async (req, res) => {
    try {
        await Contact.deleteOne({ _id: req.params.contactId })
        res.json({ message: 'Successfully deleted contact' })
    } catch (error) {
        res.send(error)
    }
}
