const { findUser } = require('../services/userService');
const bcrypt = require("bcrypt");
require('dotenv/config');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../controllers/jwtAuth');
const {validate}=require('../validation/authValidation');

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

        const token = await generateToken(user);

        if (user && passwordvalid) {
            return res
                .status(200)
                .header('x-auth-accessToken', token.accessToken)
                .header('x-auth-refreshToken', token.refreshToken)
                .send({ message: "Logged In Successfully" });
        }
    }
    catch (ex) {
        console.log("Auth Controller Error: authenticateUser", ex);
    }
}

authenticateRefreshToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user={email};
        if (req.body.email!== null || req.body.email!== undefined) {
            const refreshToken = req.headers['authorization'];

            const verifyToken = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
            if (!verifyToken) return;
            const token = await generateToken(user);
            if (token) {
                return res
                    .status(200)
                    .header('x-auth-accessToken', token.accessToken)
                    .header('x-auth-refreshToken', token.refreshToken)
                    .send({message: "Tokens are generated"})
            }

        }
        else 
        return res.status(400).send({message: "Request Body is empty"});
    }
    catch (ex) {
        console.log(ex);
        res.status(403).send({ message: ex.message })
    }

}
module.exports = { authenticateUser };