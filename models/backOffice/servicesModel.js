const mongoose = require('mongoose');
const servicesSchema = mongoose.Schema({
    _id : String,
    libelle_services:String,
    description:String
})
module.exports = mongoose.model('services',servicesSchema,'Services');
