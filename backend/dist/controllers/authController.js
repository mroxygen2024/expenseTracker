import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/db.js";
import { z } from "zod";
const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
// REGISTER
export const register = async (req, res) => {
    try {
        const { email, password } = userSchema.parse(req.body);
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });
        res.status(201).json({ message: "User created", user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = userSchema.parse(req.body);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            return res.status(401).json({ message: "Invalid credentials" });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({ token, user: { id: user.id, email: user.email } });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
