const router = require('express').Router();
let Visitor = require('../../models/visitor.model');

router.route('/').get((req, res) => {
    res.send("hello world");
    // User.find()
//         .then(users => res.json())
//         .catch(err => res.status(400).json('error: ' + err))
})
// router.route('/add').post((req, res) => {
//     const { username, key} = req.body;
//
//     const newUser = new User({
//         username,
//         key
//     })
//     newUser.save()
//         .then(() => res.json('User added'))
//         .catch(err => res.status(400).json('Error: ' + err));
// })
//
module.exports = router;