const mongoose = require("mongoose");

const connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`database connected successfully`)

    } catch (error){
        console.log("🚀 ~ file: database.js:7 ~ connection ~ error:", error)
    }
}

module.exports = connection;