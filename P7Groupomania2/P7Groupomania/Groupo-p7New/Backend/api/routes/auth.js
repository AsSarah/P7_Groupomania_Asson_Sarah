const db = require("../config/db.config");
const User = require("../models/User");
const router = require("express").Router();
const Users = db.users; // récupére le modele User//
const bcrypt = require("bcrypt");



//S'inscrire//
router.post("/register", async (req, res) => {
    try {
        // Génére un nouveau mot de passe //
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUsers = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        // Enregistre l'utilisateur et retourne la reponse//
        const user = await newUsers.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Connexion//
router.post("/login", async (req, res) => {
    try {
        const user = await Users.findOne({ where: { email: req.body.email } });
        !user && res.status(404).json("Utilisateur non trouvé");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("Mot de passe incorrect");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
