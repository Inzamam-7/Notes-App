const Joi = require("joi");

const registerValidation = Joi.object({
    fullName:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
})

const loginValidation = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
})

const noteValidation = Joi.object({
    title:Joi.string().required(),
    content:Joi.string().required(),
    tags:Joi.array().items(Joi.string()).default([]),
    isPinned:Joi.string().default(false),
    userId:Joi.string(),
    createdOn:Joi.string().default(Date.now),
})

module.exports = {registerValidation,loginValidation,noteValidation}