const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const cors = require('cors');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const contact_router = require('./routes/contact_route');
const product_router = require('./routes/product_route');
const category_router = require('./routes/category_route');
const add_to_cart_router = require('./routes/addToCartRoute');
const user_router = require('./routes/user_route');
const order_router = require('./routes/order_route');
dotenv.config();


const app = express();
const port = 3000;

// database connection
try{
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connection successful");
}catch (err) {
    console.log(err);
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/upload', express.static('upload'));

// Routes
app.post("/register", async (req, res) => {
    const { name, email, mobile, password } = req.body;
    const userExist = await User.findOne({ email });

    if(userExist){
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bycrypt.hash(password, 10);
    try{
        
        const user = new User({ name, email, mobile, password: hashedPassword });
        await user.save();
        const token = await jwt.sign({userId: user._id, role: user.role}, "SecretKey", {expiresIn: "1h"});

        res.status(201).json({ message: "User registered successfully", 
            token, 
            name: user.name,  
            role: user.role
         });
    } catch (err) {

        res.status(500).json({ message: "Error registering user" });
    }
});


app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try{ 
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        if(await bycrypt.compare(password, user.password) === false){
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = await jwt.sign({userId: user._id, role: user.role}, process.env.SECRET, {expiresIn: "1h"});
        res.status(200).json({ message: "Login successful", 
            token,
            name: user.name,
            role: user.role
         });

    } catch (err) {

        res.status(500).json({ message: "Error logging in" });

    }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use("/user", user_router);

app.use("/products", product_router);

app.use("/category", category_router);

app.use("/api", contact_router)

app.use("/add-to-cart" , add_to_cart_router)

app.use("/payment", order_router)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});