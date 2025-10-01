import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true


    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

    },
    fullname: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        required: true
    },
    watchHistory:{
        type: Schema.Types.ObjectId,
        ref :"Video"
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password") )return next();
    this.password = bcrypt.hash(this.password, 10) 
    next();
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },

    process.env.SECRET_TOKEN,

{
    expiresIn: process.env.SECRET_TOKEN_EXPIRY
    
})
}
userSchema.methods.generateRefresh_Token = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },

    process.env.REFRESH_SECRET_TOKEN,

{
    expiresIn: process.env.REFRESH_SECRET_TOKEN_EXPIRY
    
})
}

export const user = mongoose.model("User", userSchema)