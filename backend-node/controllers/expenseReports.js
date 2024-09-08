const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

// fonction pour lire les données du fichier JSON
const readData = () => {
  const data = fs.readFileSync(path.resolve(__dirname, "../db/expenseReports.json"));
  return JSON.parse(data);
};

// fonction pour écrire les données dans le fichier JSON
const writeData = (data) => {
  fs.writeFileSync(path.resolve(__dirname, "../db/expenseReports.json"), JSON.stringify(data));
};

module.exports = {
  // récupérer toutes les notes de frias
  getAll: (req, res) => {
    try {
      const expenseReports = readData();
      res.json(expenseReports);
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },
  
  // récupérer une note de frais
  getOne: (req, res) => {
    try {
      const expenseReports = readData();
      const id = req.params.id;
      const expenseReport = expenseReports.find((expenseReport) => expenseReport.id === id);
      if (expenseReport) {
        res.json(expenseReport);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

  // ajouter une nouvellenote de frais 
  postOne: (req, res) => {
    try {
      const expenseReports = readData();
      const sortedReports = expenseReports.sort(
        (a, b) => Number(b.expenseReportnum) - Number(a.expenseReportnum)
      );
      const lastExpenseReport = sortedReports[0];
      const newExpenseReportNum = lastExpenseReport ? Number(lastExpenseReport.expenseReportnum) + 1 : 1;

      const { category } = req.body;

      const newExpenseReport = {
        ...req.body,
        expenseReportnum: newExpenseReportNum,
        category: category || 'autre',
        id: uuid(),
      };

      expenseReports.push(newExpenseReport);
      writeData(expenseReports);

      res.json(newExpenseReport);
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

  // mettre à jour une note de frias
  patchOne: (req, res) => {
    try {
      let expenseReports = readData();
      const id = req.params.id;
      let updatedExpenseReport = expenseReports.find((expenseReport) => expenseReport.id === id);
      let updatedExpenseReportIndex = expenseReports.findIndex((expenseReport) => expenseReport.id === id);
      if (updatedExpenseReport) {
        updatedExpenseReport = { ...updatedExpenseReport, ...req.body };
        expenseReports[updatedExpenseReportIndex] = { ...updatedExpenseReport };
        writeData(expenseReports);
        res.json(updatedExpenseReport);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

  // supprimer une note
  deleteOne: (req, res) => {
    try {
      let expenseReports = readData();
      const id = req.params.id;
      expenseReports = expenseReports.filter((expenseReport) => expenseReport.id !== id);
      writeData(expenseReports);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

  // récupérer le dernier numéro de note de frais
  getLastNum: (req, res) => {
    try {
      const expenseReports = readData();
      const sortedReports = expenseReports.sort(
        (a, b) => Number(b.expenseReportnum) - Number(a.expenseReportnum)
      );
      const lastExpenseReport = sortedReports[0];
      const lastNum = lastExpenseReport ? Number(lastExpenseReport.expenseReportnum) : 0;
      res.json({ lastNumber: lastNum });
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },
};
