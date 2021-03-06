const router = require('express').Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/fileanalyse', upload.single('upfile'), (req, res) => {
    res.json({
        "name": req.file.originalname,
        "type": req.file.mimetype,
        "size": req.file.size
    })
})


module.exports = router;
