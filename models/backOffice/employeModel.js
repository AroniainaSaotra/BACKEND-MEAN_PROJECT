const mongoose = require('mongoose');
const employeSchema = mongoose.Schema({
    _id : String,
    name:String,
    mail:String,
    password: String,
    role : String
})
module.exports = mongoose.model('employe',employeSchema,'Employe');
