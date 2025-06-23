import zod from 'zod'
import jwt from 'jsonwebtoken'
const userMiddleware = async(req,res,next)=>{
    const schema = zod.object({
        username:zod.coerce.string(),
        password:zod.coerce.string().min(6, "Password is too short"),
        firstname:zod.coerce.string().optional(),
        lastname:zod.coerce.string().optional(),
    })
    const result = schema.safeParse( req.body );

    if (!result.success) {
        return res.status(400).json({
        msg: "Validation failed",
        errors: result.error.errors
        });
    }
    next()
}

const userUpdateMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Token not provided or malformed" });
    }
    const user = jwt.verify(authHeader.split(" ")[1],"nikash13579")
    if(!user){
        return res.status(400).json({
            msg: "Validation failed",
        });
    }
    req.body["userId"] = user.userId
    const schema = zod.object({
        firstname:zod.coerce.string().optional(),
        lastname:zod.coerce.string().optional(),
        password:zod.coerce.string().optional(),
    })
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
        msg: "Validation failed",
        errors: result.error.errors
        });
    }
    next()
}
export {userMiddleware,userUpdateMiddleware}