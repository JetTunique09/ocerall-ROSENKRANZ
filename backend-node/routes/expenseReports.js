const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/expenseReports.js");

// Route pour récupérer toutes les note de fraiss
router.get("/", ctrl.getAll);

// Route pour récupérer le dernier numéro de note de frais
router.get("/lastnum", ctrl.getLastNum);

// Route pour récupérer une seule note de frais en fonction de son ID
router.get("/:id", ctrl.getOne);

// Route pour ajouter une nouvelle note de frais
router.post("/", ctrl.postOne);

// Route pour mettre à jour une note de frais existante
router.patch("/:id", ctrl.patchOne);

// Route pour supprimer une note de frais en fonction de son ID
router.delete("/:id", ctrl.deleteOne);

module.exports = router;
