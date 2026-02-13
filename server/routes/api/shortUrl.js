const router = require('express').Router();
const Url = require('../../models/url');
const dns = require('dns');
// using WHATWG URL API instead of deprecated url.parse
const { URL } = require('url');

router.post('/shorturl', async (req, res) => {
    const { url } = req.body;
    console.log(url);

    // basic URL syntax check
    let hostname;
    try {
        hostname = new URL(url).hostname;
    } catch (e) {
        return res.json({ error: "invalid url" });
    }

    // perform DNS lookup before proceeding
    const lookupAsync = (name) => new Promise((resolve, reject) => {
        dns.lookup(name, (error, address) => {
            if (error || !address) {
                return reject(new Error('lookup failed'));
            }
            resolve(address);
        });
    });

    try {
        await lookupAsync(hostname);
    } catch (err) {
        return res.json({ error: "invalid url" });
    }

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
        return res.send({ error: error.message });
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