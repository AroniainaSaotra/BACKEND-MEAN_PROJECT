const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const Employe = require('../models/backOffice/employeModel');
const RendezVous = require('../models/backOffice/rendezVousModel');

//nb de reservation par jour / mois
router.get('/reservationParJour/count', async (request, response) => {
    try {
        const { type } = request.query;

        let aggregateOptions;

        if (type === 'day') {
            // Agrégation par jour
            aggregateOptions = [
                {
                    $group: {
                        _id: {
                            day: { $dayOfMonth: "$dateHeureRDV" },
                            month: { $month: "$dateHeureRDV" },
                            year: { $year: "$dateHeureRDV" }
                        },
                        count: { $sum: 1 }
                    }
                }
            ];
        } else if (type === 'month') {
            // Agrégation par mois
            aggregateOptions = [
                {
                    $group: {
                        _id: {
                            month: { $month: "$dateHeureRDV" },
                            year: { $year: "$dateHeureRDV" }
                        },
                        count: { $sum: 1 }
                    }
                }
            ];
        } else {
            return response.status(400).json({ message: "Type de période invalide. Veuillez spécifier 'day' ou 'month'." });
        }

        const results = await RendezVous.aggregate(aggregateOptions);

        return response.status(200).json({ results });
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
});

module.exports = router;