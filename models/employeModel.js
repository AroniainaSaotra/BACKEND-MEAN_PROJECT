const mongoose = require('mongoose');
const employeSchema = mongoose.Schema({
    name:String,
    mail:String,
    password: String,
})
module.exports = mongoose.model('employe',employeSchema,'Employe');