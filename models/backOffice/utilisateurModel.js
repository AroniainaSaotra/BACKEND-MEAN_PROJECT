const mongoose = require('mongoose');
const employeSchema = mongoose.Schema({
    _id : String,
    name:String,
    mdp:String,
    sexe: String,
    mail : String
})
module.exports = mongoose.model('employe',employeSchema,'Employe');
