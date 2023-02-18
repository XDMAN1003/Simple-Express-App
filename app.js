require('dotenv').config();

const express = require("express");
const { route } = require('express/lib/application');
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost/subscribers", {useNewUrlParser: true});
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

const db = mongoose.connection
db.on("error", (error) => console.error(error));
db.prependOnceListener("open", ()=> console.log("Connected to Database"));

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const classes = require("./routes/class");
app.use('/class',classes)

const student = require("./routes/student");
app.use('/student',student)

//const sub = require("./routes/sub");
//app.use('/sub', sub);


app.listen(3500, () => console.log("Start Server Now"))