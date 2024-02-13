const { request, response } = require('express');
const express = require('express');
const router = express.Router();

const Employe = require('../models/backOffice/employeModel');
const RendezVous = require('../models/backOffice/rendezVousModel');

// Route pour récupérer la liste des employes
router.get('/listeemploye', async (request, response) => {
    try {
      const employes = await Employe.find();
  
      if (employes.length > 0) {
        const reponse = {
          message: 'OK',
          value: employes,
          code: 200,
        };
        response.json(reponse);
      } else {
        const rep = {
          message: 'Aucun employe trouvé',
          code: 404,
          value: null
        };
        response.status(404).json(rep);
      }
    } catch (err) {
      const rep = {
        message: 'Erreur serveur',
        code: 500,
        value: err.message
      };
      response.status(500).json(rep);
    }
  });

// route pour recuperer les rendez-vous par employe 
router.get('/rendezVousEmploye/:idEmploye',async(request,response)=>{
  const idEmploye = request.params.idEmploye ;
    try{
      const rdvByEmploye = await RendezVous.find({"id_employe":idEmploye});
      if (rdvByEmploye.length > 0) {
        const reponse = {
          message: 'OK',
          value: rdvByEmploye,
          code: 200,
        };
        response.json(reponse);
      } else {
        const rep = {
          message: 'Aucun rendez vous',
          code: 404,
          value: null
        };
        response.status(404).json(rep);
      }
    }catch (err){
      const rep = {
        message: 'Erreur serveur',
        code: 500,
        value: err.message
      };
      response.status(500).json(rep);
    }
});
  
module.exports = router;