const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const Employe = require('../../models/backOffice/employeModel');
const RendezVous = require('../../models/backOffice/rendezVousModel');
const Services = require('../../models/backOffice/servicesModel');
const ServiceDetail = require('../../models/backOffice/sousServicesModel');
const Offre = require('../../models/backOffice/offreModel');

// route pour ajouter une offre
router.post('/ajoutOffre', async (request, response) => {
    try {
        const { libelle_offre ,description_offre , prix_offre,date_offre} = request.body;

        Offre.libelle_offre = libelle_offre;
        Offre.description_offre = description_offre;
        Offre.prix_offre = prix_offre;
        Offre.date_offre = date_offre;
        
        await Offre.save();

        return response.status(200).json({ message: "Description de l'employé mise à jour avec succès." });
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", esrror: error.message });
    }
  });

module.exports = router;