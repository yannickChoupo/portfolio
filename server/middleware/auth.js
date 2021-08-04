const config = require('../config/key');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if (token) {
            decodedData = jwt.verify(token, 'test');
            // console.log("DATE : ",Date.now());
            if(decodedData.exp < Date.now()/1000) {
                return res.send({
                    success: false,
                    message: "jwt expired"
                })
            } else {
                console.log("token available for : ",Date.now() - decodedData.exp);
            }
            // console.log("DECODED DATA : ", decodedData);
            req.body.userId = decodedData?.id;
            req.body.visitorName = decodedData?.visitorName;
            req.body.createdAt = decodedData?.createdAt;
        }
        next();
    } catch (err) {
        // console.log("ERROR : ", err);
        return res.send({
            success: false,
            message: "jwt expired"
        })
    }
}

module.exports = auth;