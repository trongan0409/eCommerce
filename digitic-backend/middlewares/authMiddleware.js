const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express");

const authMiddleware = asyncHandler(async (req, res, next) => {
    console.log(1)
    let token;
    if (req?.headers?.authorziration?.startsWith("Bearer")) {
        token = req.headers.authorziration.split(" ")[1];
        try {
            if (token) {
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decode?.id);
                req.user = user;
                next(user);
            }
        } catch (error) {
            throw new Error("Not authorized token expired, Please login again");
        }
    } else {
        throw new Error("There is no token attached to header");
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });

    if (adminUser.role !== "admin") {
        throw new Error("You are not an admin");
    } else {
        next();
    }
});

module.exports = { authMiddleware, isAdmin };