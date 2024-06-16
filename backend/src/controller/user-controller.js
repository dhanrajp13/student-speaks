import User from "../models/user.js";
import bcrypt from "bcrypt";

// Controller to create a new user
const registerUser = async (req, res) => {
    try {
        const { email, password, roll } = req.body;
        const username = req.body.username.toString();

        const hashed = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email, username });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User with this email already exists" });
        }

        const newUser = new User({ email, username, roll, password: hashed });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await user.checkPassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = await user.generateToken();

        res.status(200).json({
            message: "Login successful",
            user,
            status: 200,
            token,
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            message: "Internal server error",
            errorMessage: error.message,
        });
    }
};

// Controller to get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error getting all users:", error);
        res.status(500).json({
            message: "Internal server error",
            errorMessage: error.message,
        });
    }
};

// Controller to delete a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            message: "Internal server error",
            errorMessage: error.message,
        });
    }
};

export { registerUser, loginUser, getUsers, deleteUser };
