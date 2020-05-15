const { saveUser, findUser, getUser } = require('../services/userService');
const { validate } = require('../validation/userValidation');
const bcrypt = require('bcrypt');

getuser = async (req, res) => {
    const user = await getUser();
    if (user) {
        return res.status(200).send(user);
    }
    else {
        return res.status(400).send({ message: "The User is not Found" });
    }

}

createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const validateUser = await validate(req.body);
        if (validateUser) {
            return res.status(400).send({ message: validateUser });
        }

        const findEmail = await findUser(req.body.email);
        if (req.body.email === findEmail.email) {
            return res.status(400).send({ message: "User Already Registered" });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const user = await saveUser(req.body);
        res.status(200).send({ message: "Register Successfully" });


    }
    catch (ex) {
        console.log("User Controller Error: createUser", ex);
    }
}


module.exports = { createUser, getuser };