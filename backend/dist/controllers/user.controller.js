import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const userRegister = async (req, res) => {
    try {
        const { username, password, firstname, lastname, age } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ msg: "User already exists" });
        }
        const newUser = await User.create({
            username,
            password,
            firstname,
            lastname,
            age
        });
        const random = Math.floor(Math.random() * 10000 + 1);
        res.status(201).json({ msg: "User registered", user: newUser, account: account });
    }
    catch (error) {
        res.status(500).json({ msg: "Registration failed", error: error.message });
    }
};
const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.MONGODB_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token, username, userId: user._id });
    }
    catch (error) {
        res.status(500).json({ msg: "Login failed", error: error.message });
    }
};
const userUpdate = async (req, res) => {
    try {
        const { username, userId, passwordNew, firstname, lastname } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (firstname)
            user.firstname = firstname;
        if (lastname)
            user.lastname = lastname;
        if (passwordNew)
            user.password = passwordNew;
        await user.save();
        res.status(200).json({ msg: "User updated", user });
    }
    catch (error) {
        res.status(500).json({ msg: "Update failed", error: error.message });
    }
};
const userAll = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Token not provided or malformed" });
        }
        const token = authHeader.split(" ")[1];
        try {
            jwt.verify(token, "nikash13579");
        }
        catch (err) {
            return res.status(403).json({ msg: "Invalid or expired token" });
        }
        const filter = {};
        const { username } = req.query;
        if (username) {
            filter.username = { $regex: username, $options: "i" };
        }
        const users = await User.find(filter).limit(10);
        const sendUsers = users.map(({ _id, username, firstname, lastname }) => ({
            userId: _id,
            username,
            firstname,
            lastname
        }));
        return res.status(200).json({ users: sendUsers });
    }
    catch (error) {
        return res.status(500).json({ msg: "Fetching users failed", error: error.message });
    }
};
export { userRegister, userLogin, userUpdate, userAll };
