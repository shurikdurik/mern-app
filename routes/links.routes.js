const {Router} = require('express');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const shortid = require('shortid')
const config = require('config')
const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const { from } = req.body;

        const code = shortid.generate();

        const existing = await Link.findOne({from})

        if (existing) {
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code;

        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        
        await link.save();

        res.status(201).json({ link });
        
    } catch (error) {
        res.status(500).json({message: 'Something wrong, try again'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId})
        res.json(links);
    } catch (error) {
        res.status(500).json({message: 'Something wrong, try again'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const links = await Link.findById(req.params.id);
        res.json(links);
    } catch (error) {
        res.status(500).json({message: 'Something wrong, try again'})
    }
})

module.exports = router;