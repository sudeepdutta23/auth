const User = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateJwtToken = (_id, email) => {
    return jwt.sign({ _id, email }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
        fullName,
        email,
        hash_password
    })

    try {
        const userr = await _user.save();
        if (userr) {
            const token = generateJwtToken(userr._id, userr.email)
            const { _id, fullName, email } = userr;
            return res.status(201).json({
                error: false,
                data: {
                    token,
                    user: { _id, fullName, email }
                }
            })
        }
    } catch (error) {
        console.log("Catch", error);
        return res.status(400).json({
            message: "Something went wrong",
            error: true
        });
    }

}

const signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        console.log("Sudeep", user);
        if (user == null) return res.status(400).json({ error: true, message: "User not found!" })
        else {
            const isPassword = await user.authenticate(req.body.password);

            if (isPassword) {
                const token = generateJwtToken(user._id, user.email);
                const { _id, fullName, email } = user;
                return res.status(201).json({
                    error: false,
                    data: {
                        token,
                        user: { _id, fullName, email }
                    }
                })
            } else {
                return res.status(400).json({
                    message: "Password did not match",
                    error: true
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong",
            error: true
        });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).exec();
        if (user) {
            console.log("USerrrrr", user)
            const { _id, fullName, email } = user;
            return res.status(201).json({
                error: false,
                data: {
                    user: { _id, fullName, email }
                }
            })
        } else {
            return res.status(200).json({
                error: false,
                message: "Something went wrong"
            })
        }
    } catch (error) {
        return res.status(200).json({
            error: false,
            message: "Something went wrong"
        })
    }
}

module.exports = { signup, signin, getUser }