const Joi = require('@hapi/joi');

//Signup validation
const signupValidation = data => {
    const schema = Joi.object({
        user_id: Joi.string().min(6).max(20).required(),
        password: Joi.string().min(8).max(25).required(),
        nickname: Joi.string().allow('').max(30),
        comment: Joi.string().allow('').max(100)
    });

    return schema.validate(data);
}

//Login validation
const loginValidation = data => {
    const schema = Joi.object({
        user_id: Joi.string().min(6).max(20).required(),
        password: Joi.string().min(8).max(25).required()
    });
    
    return schema.validate(data);
}

//Update validation
const updateValidation = data => {
    const schema = Joi.object({
        nickname: Joi.string().allow('').max(30),
        comment: Joi.string().allow('').max(100)
    });
    
    return schema.validate(data);
}

//Remove user validation
const removeValidation = data => {
    const schema = Joi.object({
        user_id: Joi.string().min(6).max(20).required(),
    });
    
    return schema.validate(data);
}

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
module.exports.removeValidation = removeValidation;
