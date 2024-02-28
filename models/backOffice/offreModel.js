const mongoose = require("mongoose");
const offreSchema = mongoose.Schema({
  libelle_offre: String,
  description_offre: String,
});
module.exports = mongoose.model("offre", offreSchema, "Offre");
