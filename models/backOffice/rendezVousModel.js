const mongoose = require('mongoose');
const rendezVousSchema = mongoose.Schema({
    _id : String,
    id_detail:String,
    id_utilisateur:String,
    id_employe : String,
    dateHeureRDV: Date,
    statut : String

})
module.exports = mongoose.model('rendez-vous',rendezVousSchema,'Rendez-vous');