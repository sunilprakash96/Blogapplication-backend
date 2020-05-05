const { User } = require('../models/userModel')

findUser = async (email) => {
    try {
        const user = await User.findOne({ email });
        console.log()
        if (user)
            return user;
        else
            return "";
    }
    catch (ex) {
        console.log("User Service Error: findUser", ex);
    }
}
//Creation of New User.
saveUser = async (user) => {
    try {
        const users = await new User(user);
        const saveUsers = await users.save();
        return saveUsers;
    }
    catch (ex) {
        console.log("User Service Error: SaveUser", ex);
    }
}

module.exports = { saveUser, findUser };