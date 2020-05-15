const jwt = require('jsonwebtoken');
require('dotenv/config');

generateToken = async (user) => {
    try {
        const accessToken = await jwt.sign({ name: user.email },
            process.env.ACCESS_SECRET_KEY, { expiresIn: '1min' });
        const refreshToken = await jwt.sign({ name: user.email },
            process.env.REFRESH_SECRET_KEY, { expiresIn: '5d' });
        const token = {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
        return token;
    }

    catch (ex) {
        console.log("jwtAuthControllers: generateToken", ex);
    }
}

verifyToken = async (req, res, next) => {
    try {
        const authToken = await req.headers['authorization'];
        const bearerHeader = await authToken.split(' ')[1];
        if (bearerHeader !== null && bearerHeader !== undefined) {
            // const tokenDetails = {
            //     accessToken: bearerHeader
            // }
            const authData = jwt.verify(bearerHeader.toString(), process.env.ACCESS_SECRET_KEY);
            if (authData) {
                next();
            }
            else
                return res.status(401).send("The Verification is Failed");
        }
        else
            return res.status(401).send({ message: "Forbidden No Token is Found" });
    }
    catch (ex) {
        res.status(401).send({ message: ex.message });
    }
};

module.exports = { generateToken, verifyToken };