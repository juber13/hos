import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [4, "firstName should be 4 character or long"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [4, "firstName should be 4 character or long"]
    },

    email: {
        type: String,
        required: true,
        validate: validator.isEmail
    },

    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female"]
    },

    role: {
        type: String,
        required: [true, "User role is required"],
        enum: ["Admin", "Patient", "Doctor"]
    },

    password: {
        type: String,
        required: [true, "password must be 6 character long"],
    },

    avatar: {
        type: String,
    },

    phone: {
        type: Number,
        minLength: [10, "Phone number should be 10 character"]

    },

    dob: {
        type: Date,
        required: [true, "Dob is required"]
    },

    doctorDepartment: {
        type: String,
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.genSalt(this.password, 10);
})

userSchema.methods.comparePassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.genrateJWT = () => {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

export default mongoose.model('User', userSchema)