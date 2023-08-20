const express = require('express');

const app = express();

// const PORT = process.env.PORT || 8000

app.get("/test", (req, res) =>{
    res.json("Test Okay")
})

// app.listen(PORT, ()=>{
//     console.log("PORT is Runnign on" + PORT);
// })

app.listen(4000)