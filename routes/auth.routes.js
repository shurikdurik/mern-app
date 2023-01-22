const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator')
const User = require('../models/User');
const router = Router();

router.post(
    '/register', 
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Min length of password is 6 digits').isLength({min: 6})
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong registration data'
            })
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: "User already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'User created'})


    } catch (error) {
        res.status(500).json({message: 'Something wrong, try again'})
    }
})

router.post('/login', async (req, res) => {
    
})

module.exports = router;