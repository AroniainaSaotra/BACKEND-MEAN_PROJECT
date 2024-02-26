const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const Employe = require('../../models/backOffice/employeModel');
const RendezVous = require('../../models/backOffice/rendezVousModel');
const Services = require('../../models/backOffice/servicesModel');
const ServiceDetail = require('../../models/backOffice/sousServicesModel');

// Route pour récupérer la liste de tous les sous-services
router.get('/listeSousServices', async (request, response) => {
    try {
        const sous_services = await ServiceDetail.find().populate('id_service');
        return response.status(200).json(sous_services);
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
});

module.exports = router;