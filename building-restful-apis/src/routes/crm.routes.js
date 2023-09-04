import {
    addNewContact,
    deleteContact,
    getContactById,
    getContacts,
    updateContact
} from "../controllers/crm.controller";

const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`);
            next()
        }, getContacts)
        .post(addNewContact)
    
    app.route('/contact/:contactId')
        .get(getContactById)
        .put(updateContact)
        .delete(deleteContact)
}

export default routes
