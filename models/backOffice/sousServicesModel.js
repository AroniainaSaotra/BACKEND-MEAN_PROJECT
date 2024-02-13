const mongoose = require('mongoose');
const sousServicesSchema = mongoose.Schema({
    _id : String,
    id_services:String,
    libelle_detail:String,
    delai_detail: Number,
    prix_detail :Number,
    comission :Number,
    description_detail :String,
    note_detail : Number
})
module.exports = mongoose.model('sous-services',sousServicesSchema,'Sous-Services');
