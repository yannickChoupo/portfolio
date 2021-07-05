const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express();
// import auth from "./middleware/auth";

// const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}), function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next();
});
const uri = process.env.ATLAS_URI;
// mongoose.connect('mongodb+srv://YannickNjilo:Jocker237@cluster0.bwiea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
mongoose.connect(process.env.ATLAS_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log(error));

const connection = mongoose.connection;
//
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// API Endpoint routes to be able to use the server to perform CRUD operations
const usersRouter = require('./routes/api/users');


const visitorsRouter = require('./routes/api/visitor');


const signUpRouter = require('./routes/api/signUp');
const signInRouter = require('./routes/api/signIn');
const verifyRouter = require('./routes/api/verify');
const logOutRouter = require('./routes/api/signOut');
const deleteAccountRouter = require('./routes/api/delete');
const registerVisitorRouter = require('./routes/api/visitorRegister');
const signInVisitorRouter = require('./routes/api/visitorSignIn');

app.use('/users', usersRouter);
app.use('/visitor', visitorsRouter);
app.use('/account/signUp', signUpRouter);
app.use('/account/signIn', signInRouter);
app.use('/account/verify', verifyRouter);
app.use('/account/signOut', logOutRouter);
app.use('/account/delete', deleteAccountRouter);

app.use('/visitor',visitorsRouter);


// app.get('/',(req,res) => {
//     res.send("Hello World");
// })

app.use(express.static(path.resolve(__dirname, "../client/build")));
// Serve static asssets if we are in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/build")));
    app.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
}


app.listen(process.env.PORT || 5000, function () {
    console.log(`Server is running on port : ${process.env.PORT || 5000}`);
})
// app.use("/public",express.static(__dirname + "/public"))
// console.log(process.env["MESSAGE_STYLE"]);
