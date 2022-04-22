const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'))
});

app.listen(port, () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
)
