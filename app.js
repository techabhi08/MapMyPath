const express = require('express');
const app = express();
// const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 3000;

// app.set('view engine', 'hbs');

app.use(express.static("public"));
// app.use(express.static("/images"));
// app.use(express.static("/js"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'))
    // res.send("Welcome to the app")
});

app.listen(port, () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
)
