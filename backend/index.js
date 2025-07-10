const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const path = require('path');
const port = 3000

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'frontend')));

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/Amazon', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongodb connected"))
    .catch((err) => console.log("error in connection", err))

//Schema
const AmzonLogin = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        minlength: 6
    }
})

const newlogin = mongoose.model('newlogin', AmzonLogin);

app.post('/login', async (req, res) => {
    try {
        const { name, phoneNumber, email, password } = req.body
        const newuser = new newlogin({ name, phoneNumber, email, password })
        await newuser.save();
        res.json({ message: "User registered Successfully!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'failed' })
    }
})

app.post('/sign', async (req, res) => {
    try {
        const { email, password } = req.body

        const newSign = await newlogin.findOne({ email });
        if (!newSign) {
            return res.status(400).json({ message: "user not found" })
        }

        if(newSign.password!=password){
               return res.status(401).json({ message: "Invalid password" });
        }


        res.json({ message: "Login SuccessFully", newSign: newSign });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "failed" })
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})