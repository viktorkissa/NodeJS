const {body} = require('express-validator/check')
const User = require('../models/user')

exports.loginValidators = [
    body('email')
        .isEmail().withMessage('Enter correct Email')
        .custom(async (value, req) => {
            try {
                const user = await User.findOne({email: value})

                if (!user) {
                    return Promise.reject('Login or password are not correct!')
                }
            } catch (err) {
                console.log(err)
            }
        })
        .normalizeEmail(),
    body('password', 'Password should be min 6 symbols')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .trim()
]

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Enter correct Email')
        .custom(async (value, req) => {
            try {
                const user = await User.findOne({email: value})

                if (user) {
                    return Promise.reject('Email is already in use')
                }
            } catch (err) {
                console.log(err)
            }
        })
        .normalizeEmail(), 
    body('password', 'Password should be min 6 symbols')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords should be the same')
            }
            return true
        })
        .trim(),
    body('name')
        .isLength({min: 2}).withMessage('Name should be min 3 symbols')
        .trim()
]

exports.courseValidators = [
    body('title')
        .isLength({min: 3}).withMessage('Min 3 symbols')
        .trim(),
    body('price')
        .isNumeric().withMessage('Enter correct price'),
    body('img', 'Enter correct Url for image').isURL()
]