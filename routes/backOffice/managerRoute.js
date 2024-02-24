const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const Employe = require('../../models/backOffice/employeModel');
const RendezVous = require('../../models/backOffice/rendezVousModel');

//nb de reservation par jour / mois
router.get('/nbDeReservation', async (request, response) => {
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

//Chiffre d'affaire par jour / mois
router.get('/chiffre-affaires', async (request, response) => {
    try {
        const { type } = request.query;

        let aggregateOptions;

        if (type === 'day') {
            // Agrégation par jour
            aggregateOptions = [
                {
                    $lookup: {
                        from: "Sous-Services",
                        localField: "id_detail",
                        foreignField: "_id",
                        as: "details"
                    }
                },
                {
                    $group: {
                        _id: {
                            day: { $dayOfMonth: "$dateHeureRDV" },
                            month: { $month: "$dateHeureRDV" },
                            year: { $year: "$dateHeureRDV" }
                        },
                        chiffreAffaires: { $sum: { $sum: "$details.prix_detail" } }
                    }
                }
            ];
        } else if (type === 'month') {
            // Agrégation par mois
            aggregateOptions = [
                {
                    $lookup: {
                        from: "Sous-Services",
                        localField: "id_detail",
                        foreignField: "_id",
                        as: "details"
                    }
                },
                {
                    $group: {
                        _id: {
                            month: { $month: "$date_heure_rdv" },
                            year: { $year: "$date_heure_rdv" }
                        },
                        chiffreAffaires: { $sum: { $sum: "$details.prix_detail" } }
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

//Benefice par mois

module.exports = router;