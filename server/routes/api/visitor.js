const router = require('express').Router();
const visitorController = require('../../controllers/visitor');

router.get('/',(req, res) => {
    return res.send("hello");
})
router.post('/register',visitorController.visitorSignUp);
router.post('/signIn',visitorController.visitorSignIn);
module.exports = router;