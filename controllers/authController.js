const { findUser } = require('../services/userService');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv/config');

authenticateUser = async (req, res) => {
    try {
        const { email } = req.body;

        const validateUser = await validate(req.body);
        if (validateUser) {
            return res.status(400).send({ message: validateUser });
        }

        const user = await findUser(email);
        if (!user) return res.status(400).send("Invalid Email or Password");

        const passwordvalid = await bcrypt.compare(req.body.password, user.password);
        if (!passwordvalid) return res.status(400).send("Invalid Email or Password");

        const token = jwt.sign({ name: user.email }, process.env.SECRETKEY, {expiresIn: '15min'});

        if (user && passwordvalid) {
            return res.status(200).header('x-auth-token', token).send({ message: "Logged In Successfully" });
        }
    }
    catch (ex) {
        console.log("Auth Controller Error: authenticateUser", ex);
    }
}
module.exports = { authenticateUser };