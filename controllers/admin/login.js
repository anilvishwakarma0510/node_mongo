const AdminModel = require('../../models/adminSchema')
const bcrypt = require("bcrypt")

exports.login = async (req,res) => {
    let { email, password } = req.body;
    console.log(req.body)

    if(!email || !password){
        res.status(400).json({
            status:0,
            message:'Check parameter'
        })
        return
    }

    try {

        const response = await AdminModel.findOne({email:email});

        if(!response){
            res.status(500).json({
                status:0,
                message:'Invalid credential!'
            });
            return;
        }

        let checkPass = await bcrypt.compare(password,response.password)

        if(checkPass){

            let token = await response.generateJWTToken();
        
            res.status(200).json({
                status:1,
                data:response,
                token,
                message:'Success!'
            });
            return;
        } else {
            res.status(401).json({
                status:0,
                message:'Invalid credential!'
            });
            return;
        }
        
    } catch (error) {
        console.log("🚀 ~ file: login.js:42 ~ exports.signup= ~ error:", error)
        
        res.status(500).json({
            status:0,
            message:'Something went wrong',
            error:error
        })
        return
    }
}

exports.signup = async (req,res) => {
    let { first_name, last_name, email, password, cpassword } = req.body;
    console.log(req.body)

    if(!first_name || !last_name || !email || !password || !cpassword){
        res.status(400).json({
            status:0,
            message:'Check parameter'
        })
        return
    }

    if(password !== cpassword){
        res.status(400).json({
            status:0,
            message:'confirm password not matched'
        })
        return
    }
    try {

        const newUser = new AdminModel({
            first_name:first_name,
            last_name:last_name,
            email:email,
            password:password
        });

        const response = await newUser.save()

        //let token = await response.generateAuthToken();

        res.status(200).json({
            status:1,
            data:response,
            message:'Registration done'
        });
        
    } catch (error) {
        console.log("🚀 ~ file: login.js:42 ~ exports.signup= ~ error:", error)
        
        res.status(500).json({
            status:0,
            message:'Something went wrong',
            error:error
        })
        return
    }
}