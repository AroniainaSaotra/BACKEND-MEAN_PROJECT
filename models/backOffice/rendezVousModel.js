const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const rendezVousSchema = mongoose.Schema({
    _id : ObjectId,
    id_detail:ObjectId,
    id_utilisateur:ObjectId,
    id_employe : ObjectId,
    dateHeureRDV: Date,
    statut : String

})
module.exports = mongoose.model('rendez-vous',rendezVousSchema,'Rendez-vous');