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
exports.userUpdateMiddleware = exports.userMiddleware = void 0;
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = zod_1.default.object({
        username: zod_1.default.coerce.string(),
        password: zod_1.default.coerce.string().min(6, "Password is too short"),
        firstname: zod_1.default.coerce.string().optional(),
        lastname: zod_1.default.coerce.string().optional(),
    });
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            msg: "Validation failed",
            errors: result.error.errors
        });
    }
    next();
});
exports.userMiddleware = userMiddleware;
const userUpdateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Token not provided or malformed" });
    }
    const user = jsonwebtoken_1.default.verify(authHeader.split(" ")[1], "nikash13579");
    if (!user) {
        return res.status(400).json({
            msg: "Validation failed",
        });
    }
    req.body["userId"] = user.userId;
    const schema = zod_1.default.object({
        firstname: zod_1.default.coerce.string().optional(),
        lastname: zod_1.default.coerce.string().optional(),
        password: zod_1.default.coerce.string().optional(),
    });
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            msg: "Validation failed",
            errors: result.error.errors
        });
    }
    next();
});
exports.userUpdateMiddleware = userUpdateMiddleware;
