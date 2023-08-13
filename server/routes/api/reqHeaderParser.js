const router = require('express').Router();
// const reqHeaderControllers = require('../../controllers/timestamp');

router.get('/', (req, res) => {
    let { headers, accept } = req;
    let software = headers['user-agent'];
    let language = headers['accept-language']
    res.json({
        ipaddress: req.ip,
        language: language,
        software: software
    })
})
// router.post('/api/whoiam/:???d', reqHeaderControllers....);


module.exports = router;