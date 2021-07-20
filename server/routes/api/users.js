const router = require('express').Router();
let User = require('../../models/user.model');

router.route('/').get((req, res) => {
    res.send("hello world");
    // User.find()
//         .then(users => res.json())
//         .catch(err => res.status(400).json('error: ' + err))
})
module.exports = router;