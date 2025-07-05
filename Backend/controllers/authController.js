const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

function generateToken(userId) {
    return jwt.sign({ id: userId },
        process.env.JWT_SECRET,
        { expiresIn: 80000 }
    )
}

// @decr It is used to register the new user
// @route POST /api/auth/register
// @access public
async function handleRegister(req, res) {
    try {
        const {
            userName,
            email,
            password,
            role
            // profileIamgeUrl
        } = req.body

        if (!userName) {
            return res.status(400).json({
                error: true,
                message: "Please give name"
            })
        }

        if (!email) {
            return res.status(400).json({
                error: true,
                message: "Please give email"
            })
        }

        if (!password) {
            return res.status(400).json({
                error: true,
                message: "Please give password"
            })
        }

        if (!role) {
            return res.status(400).json({
                error: true,
                message: "Please give role"
            })
        }

        function isUpperCase() {
            let firstLetter = word.charAt(0);
            if (firstLetter === firstLetter.toUpperCase()) {
                return true
            }
            return false;
        }

        function capitalize(word) {
            let firstLetter = word.slice(0, 1);
            let remainingWord = word.slice(1,);

            return firstLetter.toUpperCase() + remainingWord;

        }

        if(!isUpperCase(role)){
            role = capitalize(role);
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: true,
                message: "User aldready exist"
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const registerCredentials = {
            userName,
            email,
            password: hashedPassword,
            role
            // profileIamgeUrl
        }

        const user = await User.create(registerCredentials);

        res.status(201).json({
            error: false,
            message: "Registration Successfull",
            user,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @decr It is used to Login in the existing user
// @route POST /api/auth/login
// @access public
async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                error: true,
                message: "Please give email",
            });
        }

        if (!password) {
            return res.status(400).json({
                error: true,
                message: "Please give password",
            });
        }

        // Use findOne to get a single user object
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                error: true,
                message: "Email does not exist",
            });
        }

        const isPasswordMatch = await bcryptjs.compare(password, userData.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                error: true,
                message: "Incorrect password",
            });
        }

        res.status(201).json({
            error: false,
            message: "Login successful",
            user: userData,
            token: generateToken(userData._id),
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
        });
    }
}

// @decr It is used to get the current user
// @route /api/auth/getProfile
// @access private
async function handleGetProfile(req, res) {
    try {
        const { id } = req.user;
        console.log(req.user);
        const user = await User.findById({ _id: id }).select("-password");

        if (!user) {
            res.status(404).json({
                error: true,
                message: "User not found"
            })
        }

        res.status(200).json({
            error: false,
            message: "User is fetched successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

module.exports = {
    handleRegister,
    handleLogin,
    handleGetProfile
}