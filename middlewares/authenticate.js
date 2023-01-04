const { HttpError } = require("../helpers");
const { User } = require("../models/user")
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { SECRET_KEY } = process.env;

const nextError = HttpError(401, "Not authorized");

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        next(nextError)
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = User.findById(id);
        if (!user) {
            next(nextError)
        }
        req.user = user;
        next();
    } catch (error) {
        next(nextError)
    }

}
module.exports = authenticate