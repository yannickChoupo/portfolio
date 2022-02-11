const timestamp = async (req, res) => {
    // get the request parameter
    let date = req.params.date;
    console.log(typeof date);

    let newDate, unixValue, utcValue;
    newDate = new Date(date);

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