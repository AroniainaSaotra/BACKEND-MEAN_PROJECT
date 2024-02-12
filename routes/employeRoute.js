const { request, response } = require('express');
const express = require('express');
const router = express.Router();

const Employe = require('../models/employeModel');

// Route pour récupérer tous les utilisateurs
router.get('/listeemploye', async (request, response) => {
    try {
      const users = await Employe.find();
  
      if (users.length > 0) {
        const reponse = {
          message: 'OK',
          value: users,
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


  
module.exports = router;