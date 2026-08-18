const router = require('express').Router();
const Message = require('../../models/message');

// POST /api/contact
router.post('/', async (req, res) => {
    const { text } = req.body;
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


router.get('/all', async (req, res) => {
    try {
        const messages = await Message.find();
        return res.json({ success: true, messages });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
