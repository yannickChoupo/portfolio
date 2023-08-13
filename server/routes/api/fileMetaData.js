const router = require('express').Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
    console.log("Meta request : ", );
    res.json({
        "name": req.file.originalname,
        "type": req.file.mimetype,
        "size": req.file.size
    })
})


module.exports = router;
