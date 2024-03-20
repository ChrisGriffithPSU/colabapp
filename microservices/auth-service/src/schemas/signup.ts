import Joi, { ObjectSchema } from 'joi';

export const signupSchema: ObjectSchema = Joi.object().keys({
    username: Joi.string().min(4).max(25).required().messages({
        'string.base': 'Username must be a string',
        'string.min': 'Username must be longer than 4 characters',
        'string.max': 'Username must be shorter than 25 characters',
        'string.empty': 'Username is a required field'
    }),
    password: Joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/).required().messages({
        'string.base': 'Password must be a string',
        'string.min': 'Password must be longer than 8 characters',
        'string.pattern.base': 'Password must include uppercase, lowercase, and a special character',
        'string.empty': 'Username is a required field'
    }),
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
        'string.base': 'Email must have a valid domain (e.g. example.com)',
        'string.empty': 'Email is a required field'
    }),
    profilePicture: Joi.string().messages({
        'string.base': 'Profile Picture url must be a string'
    })
});