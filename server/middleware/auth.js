const config = require('../config/key');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    console.log(req.headers);
    try {
        const token = req.headers.Authorization.split(" ")[1];
        const isCustomAth = token.length < 500;

        // Data from the token
        let decodedData;

        if(token && isCustomAth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        }
        next();
    } catch (err) {
        console.log(err);
    }

}

export default auth;