const customerService = require("../services/customer.service");

// Fonction pour l'inscription d'un client
async function signUp(req, res) {
  try {
    const result = await customerService.signUpCustomer(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error during customer signup:", error);
    res.status(500).json({ error: "An error occurred during customer signup" });
  }
}

module.exports = {
  signUp,
};
