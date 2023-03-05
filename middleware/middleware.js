const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("🚀 ~ file: middleware.js:3 ~ exports.authenticateToken= ~ authHeader:", authHeader)
    //next();
    
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.status(401).json({
            status:0,
            message:"Unauthorized"
        });
        return;
    }
    jwt.verify(token, process.env.MY_SECRET, function (err, user) {
        if (err) {
            res.status(401).json({
                status:0,
                message:"Unauthorized",
                error:err
            });
            return;
        }
        req.user = user;
        console.log("🚀 ~ file: middleware.js:25 ~ user:", user)
        next();
    });
}

module.exports = authenticateToken;