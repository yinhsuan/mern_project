import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist!" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            // console.log("33333333");
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status.json(500).json({ message: "Something Went Wrong :(" });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;


    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // console.log("11111111");
            return res.status(400).json({ message: "User already exists!" });
        }
        if (password !== confirmPassword) {
            // console.log("22222222");
            return res.status(400).json({ message: "Password don't match" });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result, id: result._id }, 'test', {expiresIn: "1h" });
        res.status(200).json({ result, token });
    } catch (error) {
        res.status.json(500).json({ message: "Something Went Wrong :(" });
    }
}