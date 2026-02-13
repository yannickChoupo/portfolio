const timestamp = async (req, res) => {
    let date = req.params.date;
    let newDate, unixValue, utcValue;
    if (!isNaN(date)) {
        newDate = new Date(parseInt(date));
    } else {
        newDate = new Date(date);
    }

    if (newDate.toUTCString() === "Invalid Date") {
        return res.json({ "error": "Invalid Date" });
    } else {
        utcValue = newDate.toUTCString();
        unixValue = newDate.valueOf();
    }
    return res.json({
        "unix": unixValue,
        "utc": utcValue
    })
}


module.exports = {
    timestamp
};