const {check, validationResult} = require('express-validator');

exports.validateSignIn = [
    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!')
        .bail()
        .isLength({min: 6})
        .withMessage('Minimum 6 characters required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];

exports.validateSignUp = [
    check('firstname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('First name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('lastname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Last name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Username can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Invalid email address!')
        .bail(),
    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!')
        .bail()
        .isLength({min: 6})
        .withMessage('Minimum 6 characters required!')
        .bail()
        .matches(/\d/)
        .withMessage('Password must contain a number!')
        .bail()
        .matches(/[a-z]/)
        .withMessage('Password must contain a lowercase letter!')
        .bail()
        .matches(/[A-Z]/)
        .withMessage('Password must contain an uppercase letter!')
        .bail()
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain a special character!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    }
];
