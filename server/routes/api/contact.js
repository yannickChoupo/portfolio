const router = require('express').Router();
const Message = require('../../models/message');

// POST /api/contact/message
router.post('/message', async (req, res) => {
    const { text } = req.body;
    console.log("Text : ", text)
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        const msg = new Message({ text });
        const saved = await msg.save();
        return res.json({ success: true, message: saved });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
