/* eslint-disable no-useless-escape */
const { Schema, model } = require("mongoose");
const Joi = require("Joi");
const { handleMongooseError } = require("../helpers");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userShema = new Schema(
    {
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Set password for user'],

        },
        email: {
            type: String,
            match: emailRegex,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        // owner: {
        //     type: SchemaTypes.ObjectId,
        //     ref: 'user',
        // },
        token: String
    }, { versionKey: false, timestamps: true }
);

userShema.post("save", handleMongooseError)

const registerShema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegex).required(),
})

const loginShema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegex).required(),
})

const schemas = {
    registerShema,
    loginShema,
}
const User = model("user", userShema);

module.exports = {
    User,
    schemas,
}