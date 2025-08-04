const express = require("express");
require("dotenv").config();
//const config = require("./config.json");
const cors = require("cors");
const { mongoose } = require("mongoose");
const app = express();
const Routes = require("./routes/index");

app.use(express.json());
const PORT = 3000;
app.use(cors({
    origin:"*",
    methods: "GET, POST, DELETE, PATCH, PUT",
}))

mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("MongoDB connected successfully");
    
}).catch(err =>{console.log(`${err} while connecting mongoDB`);
})

app.use(Routes);


app.get("/", (req,res) =>{
    res.json({
        data: "Hello",
    })
})

app.listen(PORT, () =>{
    console.log(`Server is listening at ${PORT}`);
    
})