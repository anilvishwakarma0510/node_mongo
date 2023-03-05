const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    }
},{timestamps:true});

adminSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next()
})

adminSchema.methods.generateJWTToken = async function(){
    try {
        let token = await jwt.sign({id:this.id,email:this.email},process.env.MY_SECRET);
        this.token = token;
        await this.save();
        return token;
    } catch (error) {
        console.log("🚀 ~ file: adminSchema.js:39 ~ adminSchema.methods.generateJWTToken=function ~ error:", error)
        
    }
}


const AdminModel = mongoose.model('admin',adminSchema);
module.exports = AdminModel;