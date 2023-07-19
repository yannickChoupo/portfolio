const router = require('express').Router();
const timestampControllers = require('../../controllers/timestamp');

router.get('/:date?', (req, res) => {
    let date = req.params.date;
    let newDate, unixValue, utcValue;
    if (date) {
        let dateIsValid = /^(?:(?=[02468][048]00|[13579][26]00|[0-9][0-9]0[48]|[0-9][0-9][2468][048]|[0-9][0-9][13579][26])\d{4}(?:(-|)(?:(?:00[1-9]|0[1-9][0-9]|[1-2][0-9][0-9]|3[0-5][0-9]|36[0-6])|(?:01|03|05|07|08|10|12)(?:\1(?:0[1-9]|[12][0-9]|3[01]))?|(?:04|06|09|11)(?:\1(?:0[1-9]|[12][0-9]|30))?|02(?:\1(?:0[1-9]|[12][0-9]))?|W(?:0[1-9]|[1-4][0-9]|5[0-3])(?:\1[1-7])?))?)$|^(?:(?![02468][048]00|[13579][26]00|[0-9][0-9]0[48]|[0-9][0-9][2468][048]|[0-9][0-9][13579][26])\d{4}(?:(-|)(?:(?:00[1-9]|0[1-9][0-9]|[1-2][0-9][0-9]|3[0-5][0-9]|36[0-5])|(?:01|03|05|07|08|10|12)(?:\2(?:0[1-9]|[12][0-9]|3[01]))?|(?:04|06|09|11)(?:\2(?:0[1-9]|[12][0-9]|30))?|(?:02)(?:\2(?:0[1-9]|1[0-9]|2[0-8]))?|W(?:0[1-9]|[1-4][0-9]|5[0-3])(?:\2[1-7])?))?)$/.test(date);
        if (date.includes("-")) {
            if (!dateIsValid) {
                return res.json({ "error": "Invalid Date" });
            } else {
                newDate = new Date(date);
                utcValue = newDate.toUTCString();
                unixValue = newDate.valueOf();
                
                return res.json({
                    "unix": unixValue,
                    "utc": utcValue
                })
            }
        } else {
            // newDate = new Date((date === "05 October 2011, GMT") ? "10/5/2011" : parseInt(date));
            newDate = new Date(parseInt(date));
            console.log("Date integer : ", parseInt(date))
            if (newDate === "Invalid Date") {
                return res.json({ "error": "Invalid Date" });
            } else {
                utcValue = newDate.toUTCString();
                unixValue = newDate.valueOf();
                return res.json({
                    "unix": unixValue,
                    "utc": utcValue
                })
            }
        }
    } else {
        newDate = new Date();
        utcValue = newDate.toUTCString();
        unixValue = newDate.valueOf();
        return res.json({
            "unix": unixValue,
            "utc": utcValue
        })
    }
});


module.exports = router;