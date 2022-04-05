const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const config = require('./config/key');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

// const connection = mongoose.connection;
//
mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// API Endpoint routes to be able to use the server to perform CRUD operations
// // const usersRouter = require('./routes/api/users');
// const visitorsRouter = require('./routes/api/visitor');
const timestampRouter = require('./routes/api/timestamp');
const whoiamRouter = require('./routes/api/reqHeaderParser');
const excerciseRouter = require('./routes/api/excercise');
const shortUrlRouter = require('./routes/api/shortUrl');
const todosRouter = require('./routes/api/todo');
const sessionRouter = require('./routes/api/session');
const fileMetaRouter = require('./routes/api/fileMetaData');

// const SessionMiddleware = require('./middleware/session');

app.use((req, res, next) => {
    let sendedToken = '';
    let decodedToken = '';
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        // return req.headers.authorization.split(' ')[1];
        // console.log(req.headers.authorization.split(' ')[1]);
        sendedToken = req.headers.authorization.split(' ')[1];
        decodedToken = jwt.decode(sendedToken);
        // console.log(decodedToken);
    } else if (req.query && req.query.token) {
        // return req.query.token;
        // console.log(req.query.token);
    }
    // return null;
    next();
})


app.use('/api/timestamp', timestampRouter);
app.use('/api/whoiam', whoiamRouter);
app.use('/api/shorturl', shortUrlRouter);
app.use('/api/excercise', excerciseRouter);
app.use('/api/todo', todosRouter);
app.use('/api/session', sessionRouter);
app.use('/api/filemeta', fileMetaRouter);


app.use(express.static(path.resolve(__dirname, "../client/build")));
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/build")));
    app.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
}
app.get('/',(req,res) => {
    res.send("Yannick Njilo Portfolio backend");
})

app.listen(process.env.PORT || 5000, function () {
    console.log(`Server is running on port : ${process.env.PORT || 5000}`);
})
