// point entrée du serveur back
const express = require("express");
// permet les requetes depuis le front 
const cors = require("cors");

// import des routes qui viennent du dossier /routes/...
const expenseReportRoutes = require("./routes/expenseReports.js");
const userRoutes = require("./routes/users.js");

const app = express();

app.use(express.json()); // les corps des requêtes seront automatiquement convertiens en format json dans nos contrôleurs de routes
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    // credentials: true
  })
);

// utilisation des routes dans l'application
app.use("/expenseReports", expenseReportRoutes);
app.use("/users", userRoutes);

// route de base de l'api
app.get("/", (req, res) => {
  res.send({
    api: "Ocerall app API",
    version: "0.1.0",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// utilisation https://expressjs.com/fr/starter/installing.html pour installer Express.js
//détail de l'installation
// noemierosenkranz@MacBook-Pro-de-Nemie ocerallproject % npm init

