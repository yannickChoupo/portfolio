const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const config = require('./config/key');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }), function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next();
});
const uri = process.env.NODE_ENV === "production" ? process.env.ATLAS_URI : config.ATLAS_URI;
mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log(error));

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
// API Endpoint routes to be able to use the server to perform CRUD operations
const usersRouter = require('./routes/api/users');
const visitorsRouter = require('./routes/api/visitor');
const freeCodeRouter = require('./routes/api/freecodeCamp');



app.use('/users', usersRouter);
app.use('/visitor', visitorsRouter);
app.use('/freeCodeCamp', freeCodeRouter);
// app.use('/api/timestamp/:date?', freeCodeRouter);


app.use(express.static(path.resolve(__dirname, "../client/build")));
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/build")));
    app.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
}


app.listen(process.env.PORT || 5000, function () {
    console.log(`Server is running on port : ${process.env.PORT || 5000}`);
})
