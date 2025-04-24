const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required: true,
            maxLength: 50,
        },
        lastname:{
            type: String,
            required: true,
            maxLength: 50,
        },
        email:{
            type: String,
            required: true,
            maxLength: 50,
        },
        password:{
            type: String,
            required: true,
            maxLength: 50,
        },
        createdAt:{
            type: Date,
            required: true,
            default: Date.now(),
        },
        updatedAt:{
            type: Date,
            required: true,
            default: Date.now(),
        }
    }
);

module.exports = mongoose.model("User", userSchema); 