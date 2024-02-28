const mongoose = require("mongoose");
const servicesSchema = mongoose.Schema({
<<<<<<< Updated upstream
    libelle_service:String,
    description_service:String
})
module.exports = mongoose.model('services',servicesSchema,'Services');
=======
  _id: String,
  libelle_services: String,
  description_services: String,
});
module.exports = mongoose.model("services", servicesSchema, "Services");
>>>>>>> Stashed changes
