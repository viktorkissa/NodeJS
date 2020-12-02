const {body} = require('express-validator/check')
const User = require('../models/user')

exports.registerValidators = [
    body('email').isEmail().withMessage('Enter correct Email').custom(async (value, req) => {
        try {
            const user = await User.findOne({email: value})

            if (user) {
                return Promise.reject('Email is already in use')
            }
        } catch (err) {
            console.log(err)
        }
    }), 
    body('password', 'Password should be min 6 symbols').isLength({min: 6, max: 56}).isAlphanumeric(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords should be the same')
        }
        return true
    }),
    body('name').isLength({min: 2}).withMessage('Name should be min 3 symbols')
]