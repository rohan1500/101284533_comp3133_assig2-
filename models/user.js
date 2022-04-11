const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: [true,"Username could not be empty"],
        lowercase: true
    },
    firstname: {
        type: String,
        required: [true,"First Name could not be empty"],
        lowercase: true
    },
    lastname: {
        type: String,
        required: [true,"Last Name could not be empty"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true,"Password could not be empty"],
        minlength: [8, "Password must be at least 8 characters or longer"],
        // validate: {
        //     validator: (val) => /^[A-Za-z0-9#$&_]+$/.test(value),
        //     message: "Enter a valid password"
        // }
    },
    email: {
        type: String,
        unique: true,
        required: [true,"Email could not be empty"],
        lowercase: true,
        validate: {
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Enter a valid email",
          }
    },
    type: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: [true,"Type of user could not be empty"],
        lowercase: true
    },
})

const User = mongoose.model("user", UserSchema);
module.exports = User;