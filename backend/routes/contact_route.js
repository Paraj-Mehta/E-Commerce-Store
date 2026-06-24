const router = require("express").Router();
const sendEmail = require("../middleware/email.js");

router.post('/contact', async (req, res) => {

    try{

        console.log(req.body);
        const {username , email, subject, message } = req.body;

        sendEmail(email, subject, `Name : ${username}\n Email:${email}\n  Message:${message}`);

        res.status(200).json({message : "Data recevied successfully!"});

    } catch (err) {

        res.status(500).json({message : "Server Error"});

    }

})

module.exports = router;