const deleteUser = require('express').Router();
const User = require('../../models/user.model');
const UserSession = require('../../models/UserSession.js');

deleteUser.route('/').post((req, res) => {
    console.log("delete Request : ",req)
    const { body } = req;
    let {
        token
    } = body;
    if(!token) {
        return res.send({
            success: false,
            message: 'Error: token not provided '
        })
    }
    User.findOneAndDelete({ _id: token }, function (err, docs)  {
        if (err) {
            console.log("SERVER ERRO : ",err);
            return res.send({
                success: false,
                message: "Error: Server error " + err
            });
        }else{
            console.log("Deleted person : ",docs);
            return res.send({
                success: true,
                message: "user successful deleted" + err
            });
        }

    })
    // UserSession.findOneAndDelete({ userId: token }, (err, personFound) => {
    //     if (err) {
    //         return res.send({
    //             success: false,
    //             message: "Error: Server error " + err
    //         });
    //     }
    //     return res.send({
    //         success: true,
    //         message: "user successful deleted" + err
    //     });
    // })

})
module.exports = deleteUser;