//no need to configure all routes in the entry point file
//this file is being specifically to write all routes together in one place

const express = require("express");
const router = express.Router();
const 
    {
        getContacts, 
        getContact, 
        createContact, 
        updateContact, 
        deleteContact
    }
 = require("../controllers/contactController")

//make routes for all http methods that youll be needing
//NOTE - the ones that have similar endpoints can be clubbed together
//as shown below
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
//get all and post - 
router.route("/").get(getContacts).post(createContact);
//put, get individual and delete- 
router.route("/:id").put(updateContact).get(getContact).delete(deleteContact);


module.exports  = router;