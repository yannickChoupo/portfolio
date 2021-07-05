const router = require('express').Router();
const visitorController = require('../../controllers/visitor');
const auth = require("../../middleware/auth");

router.get('/',(req, res) => {
    return res.send("hello");
})
router.post('/register',visitorController.visitorSignUp);
router.post('/signIn',visitorController.visitorSignIn);
router.post('/signOut',auth,visitorController.visitorSignOut);
// router.post('/message',visitorController.visitorMessage);
module.exports = router;