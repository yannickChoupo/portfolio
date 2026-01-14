const router = require('express').Router();
const Url = require('../../models/url');
const dns = require('dns');
const urlParser = require('url');

router.post('/shorturl', async (req, res) => {
    const { url } = req.body;
    dns.lookup(urlParser.parse(url).hostname, (error, address) => {
        if (!address) {
            res.json({ error: "invalid url" })
        }
    });
    try {

        const existingUrl = await Url.find({ original_url: url });

        if (existingUrl[0]) {
            return res.send({
                success: false,
                message: 'Error: Url already exist'
            });
        }

        const newUrl = new Url();
        const count = await Url.estimatedDocumentCount();

        newUrl.original_url = url;
        newUrl.short_url = count + 1;
        savedUrl = await newUrl.save();
        return res.send({
            original_url: savedUrl.original_url,
            short_url: savedUrl.short_url
        });
    } catch (error) {
        return res.send({ error: error.message })
    }
});

router.get('/shorturl/:id', async (req, res) => {
    const { id } = req.params;
    const originalUrl = await Url.find({ short_url: id });
    if (originalUrl[0]) {
        const redirectUrl = originalUrl[0].original_url;
        res.redirect(redirectUrl);
    } else {
        res.send({
            "error": "Shortcut doesn't exist"
        })
    }

})


module.exports = router;