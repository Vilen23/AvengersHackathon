const zod = require('zod');
const userSchema = zod.object({
    username: zod.string().nonempty(),
    password: zod.string().min(8),
    email: zod.string().email(),
    profilepicture: zod.string().optional(),
    level: zod.string().optional()
});

const SigninSchema = zod.object({
    username: zod.string().nonempty(),
    password: zod.string().min(8)
})

module.exports = { userSchema, SigninSchema }