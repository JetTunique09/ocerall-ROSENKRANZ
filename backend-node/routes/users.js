//routes pour l'API
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/users.js");

//déclaration des routes pour les notesde frais soit /expenseReports, appel
//toute les expenseReports 
router.get("/", ctrl.getAll);

//recupère une seule note de frais en fonction de son id
router.get("/:id", ctrl.getOne);

//nouvelle expenseReport
router.post("/", ctrl.postOne);

//modifier note de frais existante en fonction de son id
router.patch("/:id", ctrl.patchOne);

//supprime une note de frais en fonction de son id
router.delete("/:id", ctrl.deleteOne);

module.exports = router;
