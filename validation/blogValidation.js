const expres = require("express");
const Joi = require('@hapi/joi');

//validation for Creation of Blog.
validateCreate = async (body) => {
    const joischema = Joi.object({
        title: Joi.string().min(2).max(50).required(),
        post: Joi.string().min(20).required(),
    });
    const joivalidate = joischema.validate(body);
    if (joivalidate.error) {
        return joivalidate.error.details[0].message;
    }
    else
        return "";
}

//validation for Updation of Blog.
validateUpdate = async (body) => {
    const joischema = Joi.object({
        id:Joi.string().required(),
        title: Joi.string().min(2).max(50).required(),
        post: Joi.string().min(20).required(),
    });
    const joivalidate = joischema.validate(body);
    if (joivalidate.error) {
        return joivalidate.error.details[0].message;
    }
    else
        return "";
}

//validation for Deletion of Blog.
validateDelete = async (body) => {
    const joischema = Joi.object({
        id:Joi.string().required(),
    });
    const joivalidate = joischema.validate(body);
    if (joivalidate.error) {
        return joivalidate.error.details[0].message;
    }
    else
        return "";
}

module.exports = { validateCreate, validateUpdate, validateDelete };