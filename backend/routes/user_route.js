const router = require("express").Router();
const User = require("../models/user.js")
const {protect} = require("../middleware/authMiddleware.js")

router.get('/find', protect, async (req,res)=>{

    try{

        const userId = req.user._id;

        const userObj = await User.findById(userId);

        res.status(200).json({
            user : {
                name  : userObj.name,
                email : userObj.email,
                mobile : userObj.mobile
            }
        })

    } catch (err) {

        res.status(404).json({
            message : "User not found"
        })

    }

})

module.exports = router