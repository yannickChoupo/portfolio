const timestamp = async (req, res) => {
    const { date_str } = req.params;
    console.log("timestamp request : ",req);
    console.log("request body : ",date_str);
    res.send({
        message: "timestamp"
    })
}


module.exports = {
    timestamp
};