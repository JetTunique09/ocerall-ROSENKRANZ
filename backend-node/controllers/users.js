const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
module.exports = {
  // récupère la liste de toutes les note de fraiss
  getAll: (req, res) => {
    // req représente la requête, on peut retrouver les différentes parties d'une requête http classique comme le head, le body, les params, la query et le hash
    // res représente la réponse que l'on renvoie au user, on peut remplir la réponse avec diférentes données, du texte, un fichier, du json... on simplement renvoyer un status http avec les fonctions suivantes :
    //send() -> renvoie du texte
    //sendStatus() -> renvoie le status http
    //json() -> renvoie du json
    //sendFile() -> renvoie un fichier

    try {
      // path resolve permet de résoudre le chemin de fichier relative au dossier courant
      const data = fs.readFileSync(
        path.resolve(__dirname, "../db/users.json")
      );
      res.send(data);
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
    // fs.readFile(path.resolve(__dirname,'../db/users.json'), (err, data) => {
    //   if (err) {
    //     res.sendStatus(500);
    //     throw err;
    //   }
    //   res.send(data);
    // })
  },

  // récupérer une seule note de frais en fonction de son id
  getOne: (req, res) => {
    try {
      // path resolve permet de résoudre le chemin de fichier relative au dossier courant
      const data = fs.readFileSync(
        path.resolve(__dirname, "../db/users.json")
      );
      // on convertit le json en data
      const users = JSON.parse(data);
      // on récupère l'id passé dans l'url
      const id = req.params.id;
      // on retrouve la note de frais dans le tableau
      const user = users.find((user) => user.iduser == id);
      // si j'ai bien une note de frais qui correspond
      if (user) {
        // on renvoie la note de frais
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

  // mettre àjour une note de frais en fonction de son id
  postOne: (req, res) => {
    try {
      // ouverture du json des note de fraiss users.json
      const data = fs.readFileSync(
        path.resolve(__dirname, "../db/users.json")
      );
      // on convertit le json en data
      const users = JSON.parse(data);
      // on insère la nouvelle note de frais avec un push, au passage, on crée un identifiant unique
      const newUser = { ...req.body, iduser: uuid() };
      users.push(newUser);

      // on écrit le nouveau fichier json avec la donnée à jour :
      fs.writeFileSync(
        path.resolve(__dirname, "../db/users.json"),
        JSON.stringify(users)
      );
      // on fois qu'on a fini, on retourne la donnée que l'on vient de créer
      res.json(newUser);
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

  // mettre àjour une note de frais en fonction de son id
  patchOne: (req, res) => {
    try {
      // ouverture du json des note de fraiss expenseReports.json
      const data = fs.readFileSync(
        path.resolve(__dirname, "../db/users.json")
      );
      // on convertit le json en data
      let users = JSON.parse(data);
      // on récupère l'id passé dans l'url
      const id = req.params.id;
      // on crée un nouveau tableau de note de fraiss, sans la note de frais qui correspond à l'id
      let updatedUser = users.find((user) => user.iduser == id);
      let updatedUserIndex = users.findIndex(
        (user) => user.iduser == id
      );
      if (updatedUser) {
        // on met à jour la note de frais avec les nouvelles données
        updatedUser = { ...updatedUser, ...req.body };
        // on remplace la note de frais dans le tableau de note de fraiss
        users[updatedUserIndex] = { ...updatedUser };
      } else {
        res.sendStatus(404);
        return;
      }

      // // on écrit le nouveau fichier json avec la donnée à jour :
      fs.writeFileSync(
        path.resolve(__dirname, "../db/users.json"),
        JSON.stringify(users)
      );
      // on fois qu'on a fini, on retourne la donnée que l'on vient de modifier
      res.json(updatedUser);
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

  // supprimer une note de frais en fonction de son id
  deleteOne: (req, res) => {
    try {
      // ouverture du json des note de fraiss users.json
      const data = fs.readFileSync(
        path.resolve(__dirname, "../db/users.json")
      );
      // on convertit le json en data
      let users = JSON.parse(data);
      // on récupère l'id passé dans l'url
      const id = req.params.id;
      // on crée un nouveau tableau de note de fraiss, sans la note de frais qui correspond à l'id
      users = users.filter((user) => user.iduser != id);

      // on écrit le nouveau fichier json avec la donnée à jour :
      fs.writeFileSync(
        path.resolve(__dirname, "../db/users.json"),
        JSON.stringify(users)
      );
      // on fois qu'on a fini, on retourne la donnée que l'on vient de créer
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },
};
