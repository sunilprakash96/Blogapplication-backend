const expres = require("express");
const Joi = require('@hapi/joi');

//validation for Registration.
validate = async (body) => {
    const joischema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),

    });
    const joivalidate = joischema.validate(body);
    if (joivalidate.error) {
        return joivalidate.error.details[0].message;
    }
    else
        return "";
}


module.exports = { validate };