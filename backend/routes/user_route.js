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

router.put('/update', protect, async(req,res)=>{

    try{

        const userId = req.user._id;
        const {name, email, mobile} = req.body;

        const updatedUser = {
            name : name,
            email : email,
            mobile : mobile
        }

        const update = await User.findByIdAndUpdate(userId, updatedUser);
        if(update) {

            res.status(200).json({
                message : "User Updated successfully",
                user : updatedUser
            })

        }else {

            res.status(404).json({
                message : "User not found"
            })
            
        }


    }catch (err) {

        res.status(500).json({
            message: "Error Occcured !"
        })

    }

})

module.exports = router