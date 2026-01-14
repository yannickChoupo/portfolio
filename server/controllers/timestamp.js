const timestamp = async (req, res) => {
    // get the request parameter
    let date = req.params.date;
    console.log(typeof date, date);

    let newDate, unixValue, utcValue;
    // Check if date is a numeric string (unix timestamp)
    if (!isNaN(date)) {
        newDate = new Date(parseInt(date));
    } else {
        newDate = new Date(date);
    }
    console.log(newDate.toUTCString());
    

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