const router = require('express').Router();
const freeCodeControllers = require('../../controllers/freecodeCamp');
// const auth = require("../../middleware/auth");

router.get('/',(req, res) => {
    return res.send("timestamp Microservice");
})
router.get('/timestamp/:date_str',freeCodeControllers.timestamp);

module.exports = router;
