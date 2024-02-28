const bcrypt = require("bcryptjs");
const Customer = require("../models/backOffice/utilisateurModel");
const jwt = require("jsonwebtoken");

async function signUpCustomer(customerData) {
  try {
    // Vérifier si le mot de passe est défini et est une chaîne de caractères
    if (!customerData.mdp || typeof customerData.mdp !== "string") {
      throw new Error("Password is required and must be a string");
    }

    console.log("Customer password before hashing:", customerData.mdp);

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(customerData.mdp, 10);

    console.log("Hashed password:", hashedPassword);

    // Créer un nouveau client
    const newCustomer = new Customer({
      name: customerData.name,
      sexe: customerData.sexe,
      mail: customerData.mail,
      mdp: hashedPassword,
    });

    // Sauvegarder le nouveau client dans la base de données
    await newCustomer.save();

    console.log("Customer created successfully");

    return { message: "Customer created successfully" };
  } catch (error) {
    throw error;
  }
}
module.exports = {
  signUpCustomer,
};
