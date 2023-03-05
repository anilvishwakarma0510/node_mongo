const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path")
dotenv.config({
    path: "config.env"
})
const connection = require('./connection/database')

const PORT = process.env.PORT || 8000;
console.log(PORT);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
connection();


const admin_api = 
app.use('/api/admin/',require('./router/admin_api'))

app.get('/*', (req, res) => {
    res.status(404).json({ 'status': 0, 'message': 'Not found' })
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(`error in server ${error}`)
    } else {
        console.log(`Server running on ${PORT}`)
    }

})