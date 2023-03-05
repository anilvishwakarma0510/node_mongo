const express = require("express");
const Route = express.Router();
const loginController = require("../controllers/admin/login")
const blogController = require("../controllers/admin/blog")
const authenticateToken = require("../middleware/middleware")

Route.post('/signup', loginController.signup)
Route.post('/login', loginController.login)
Route.post('/add_blog', authenticateToken, blogController.add_blog)


Route.get('/*', (req, res) => {
    res.status(404).json({
        status: 0,
        message: "Page not found"
    })
});

module.exports = Route