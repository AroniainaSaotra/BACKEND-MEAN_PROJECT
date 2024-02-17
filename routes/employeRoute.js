const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const Employe = require('../models/backOffice/employeModel');
const RendezVous = require('../models/backOffice/rendezVousModel');

// Route pour récupérer la liste des employes
//test
router.get('/listeemploye', async (request, response) => {
    try {
      const employes = await Employe.find();
  
      if (employes.length > 0) {
        const reponse = {
          message: 'liste des employes',
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
    try{
      const idEmploye = request.params.idEmploye ;
      const rdvByEmploye = await RendezVous.find({"id_employe":new ObjectId(idEmploye)});
      if (rdvByEmploye) {
        const reponse = {
          message: 'Liste rendez-vous des employes',
          value: rdvByEmploye,
          code: 200,
        };
        response.json(reponse);
      } else {
        const rep = {
          message: 'Aucun rendez vous pour cette employe',
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

//route pour rechercher les rendez-vous par date et idEmploye(session)
router.get('rendezVousParDate/:idEmploye/:dateRecherche',async(request,response)=>{
    try {
      const idEmploye = request.params.idEmploye;
      const dateRecherche = request.params.dateRecherche;
       const rechercheParDate = await RendezVous.find({"idEmploye": new ObjectId(idEmploye),"dateHeureRDV": dateRecherche})
       if (rechercheParDate){
        const reponse = {
          message: 'Rendez-vous par date OK',
          value: rdvByEmploye,
          code: 200,
        };
        response.json(reponse);
       } else {
        const rep = {
          message: 'Aucun rendez vous par date',
          code: 404,
          value: null
        };
        response.status(404).json(rep);
      }
    }catch(err){
      const rep = {
        message: 'Erreur serveur',
        code: 500,
        value: err.message
      };
      response.status(500).json(rep);
    }
});

// route pour ajouter une description du profil employe
router.post('/employe/:id', async (request, response) => {
  try {
      const id = request.params.id;
      const { description } = request.body;
      let employe = await Employe.findById(id);
      Employe.description = description;
      await Employe.save();
      return response.status(200).json({ message: "Description de l'employé mise à jour avec succès.", employe });
  } catch (error) {
      return response.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
});



module.exports = router;