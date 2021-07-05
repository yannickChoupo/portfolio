const config = require('../config/key');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    // console.log("REQUEST : ",req);
    try {
        // console.log("SERVER LOGOUT REQUEST : ", req);
        // console.log("REQUEST HEADER : ", req.headers);
        // console.log("REQUEST BODY: ", req.body);
        // const {token, message} = req.body
        // console.log("token : ", token);
        // console.log("message: ", message);
        // next();
            const token = req.headers.authorization.split(" ")[1];
            // const isCustomAth = token.length < 500;
        // console.log("REQUEST HEADER : ",req.headers);
        // console.log("REQUEST HEADER : ",req.headers.authorization);
        // console.log("REQUEST HEADER SPLIT : ",req.headers.authorization.split(" "));
        // console.log("SERVER MIDDLEWARE -> TOKEN : ",token)
        //
        //     // Data from the token
            let decodedData;
        //
            if(token) {
                decodedData = jwt.verify(token, 'test');
                console.log("DECODED DATA : ",decodedData);
                req.body.userId = decodedData?.id;
                req.body.visitorName = decodedData?.visitorName;
                req.body.createdAt = decodedData?.createdAt;
            }
            next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = auth;