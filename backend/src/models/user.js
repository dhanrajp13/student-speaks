import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roll:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.checkPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "10d",
        }
    );
};

const User = mongoose.model("User", userSchema);

export default User;
