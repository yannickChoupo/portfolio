const router = require('express').Router();
const timestampControllers = require('../../controllers/timestamp');

router.get('/api', (req, res) => {
    let newDate = new Date(), unixValue, utcValue;
    utcValue = newDate.toUTCString();
    unixValue = newDate.valueOf();
    res.json({
        "unix": unixValue,
        "utc": utcValue
    })
})
router.post('/api/timestamp/:date', timestampControllers.timestamp);


module.exports = router;