"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAll = exports.userUpdate = exports.userLogin = exports.userRegister = void 0;
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, firstname, lastname, age } = req.body;
        const existingUser = yield user_model_js_1.default.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ msg: "User already exists" });
        }
        const newUser = yield user_model_js_1.default.create({
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
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_model_js_1.default.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.MONGODB_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token, username, userId: user._id });
    }
    catch (error) {
        res.status(500).json({ msg: "Login failed", error: error.message });
    }
});
exports.userLogin = userLogin;
const userUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, userId, passwordNew, firstname, lastname } = req.body;
        const user = yield user_model_js_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (firstname)
            user.firstname = firstname;
        if (lastname)
            user.lastname = lastname;
        if (passwordNew)
            user.password = passwordNew;
        yield user.save();
        res.status(200).json({ msg: "User updated", user });
    }
    catch (error) {
        res.status(500).json({ msg: "Update failed", error: error.message });
    }
});
exports.userUpdate = userUpdate;
const userAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Token not provided or malformed" });
        }
        const token = authHeader.split(" ")[1];
        try {
            jsonwebtoken_1.default.verify(token, "nikash13579");
        }
        catch (err) {
            return res.status(403).json({ msg: "Invalid or expired token" });
        }
        const filter = {};
        const { username } = req.query;
        if (username) {
            filter.username = { $regex: username, $options: "i" };
        }
        const users = yield user_model_js_1.default.find(filter).limit(10);
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
});
exports.userAll = userAll;
