const express = require('express');
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors({
    credentials: true,
    origin:'http://localhost:5173/',
}));

const PORT = process.env.PORT || 4000


app.listen(PORT, ()=>{
    console.log("PORT is Runnign on" + PORT);
})




app.get("/test", (req, res) =>{
    res.json("Test Okay")
});