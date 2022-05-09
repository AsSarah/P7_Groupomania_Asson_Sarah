const router = require("express").Router();


const { like } = require("../config/db.config");
const db = require("../config/db.config");

const Users = db.users; // récupére le modele User//
const Posts = db.post; // récupére le modele post//
const likes = db.like; // récupére le modele post//
const Coms = db.coms; // récupére le modele post//

//Modifier utilisateur// le :id correspond a l'utilisateur en cour de modification, pas forcement celui connecté
router.put("/:id/:poste/:email", async (req, res) => {
    //ici on verifie si 'lutilisateur faisant la modification est admin ou pas
    const isadmin = await Users.findOne({
        where: {
            id: req.params.id
        }
    });

    // Si admin
    if (isadmin.isAdmin) {
        try {
            const user = await Users.update(
                {
                    email: req.params.email,
                    Poste: req.params.poste,
                   
                },
                { where: { id: req.params.id } }
            );
            res.status(200).json("Votre compte a été modifié by admin " + isadmin.id);
            return;
        } catch (err) {
            return res.status(500).json("Erreur serveur " + err);
        }
    } else {

        try {
            const user = await Users.update(
                {
                    email: req.params.email,
                   
                   
                   
                 
                    Poste: req.params.poste,
                   
                },
                { where: { id: req.params.id } }
            );
            res.status(200).json("Votre compte a été modifié");
            return;
        } catch (err) {
            return res.status(500).json("Erreur serveur " + err);
        }
    }
});

//Supprimer utilisateur//
router.delete("/:id", async (req, res) => {
   // le tri d'accessibilité a la suppression des compte etant deja fait, on lance directement la suppression
        try {
            const user = await Users.destroy({ where: { id: req.params.id } });
            /// attention, la suppression d'un user fait également supprimé ses posts, mais également les commentaires laissé sur d'autres posts
            /// ainsi que ses likes
            const lesComms = await Coms.destroy({
                where: {
                    userId: req.params.id,
                }
            });
            const lesPosts = await Posts.destroy({
                where: {
                    userId: req.params.id,
                }
            });
            const lesLikes = await likes.destroy({
                where: {
                    userId: req.params.id,
                }
            });

            res.status(200).json("Votre compte a été supprimé");
        } catch (err) {
            return res.status(500).json("Erreur serveur ici ");
        }

});
//Afficher un  utilisateur//
router.get("/:id", async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id); // findByPk permet de récupérer un unique utilisateur//
        

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Afficher un utilisateur par son username
router.get("/users/:username", async (req, res) => {
    try {
        const user = await Users.findOne(req.params.username); // findByPk permet de récupérer un unique utilisateur//
        // const { password, updatedAt, ...other } = user._doc;

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Afficher un utilisateur par son username ou userId
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await Users.findByPk(userId)
            : await Users.findOne({ where: { username } });
        // const { password, updatedAt, ...other } = user._doc;

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});
//modification image profil
router.put("/profil/:id/:img/:CoP", async (req, res) => {
 
    if (req.params.CoP === "Cover") {
        try {
            const user = await Users.update(
                {
                    coverPicture: req.params.img,
                },
                { where: { id: req.params.id } }
            );
            res.status(200).json("Votre compte a été modifié " + req.params.img + " " + req.params.id);
            return;
        } catch (err) {
            return res.status(500).json("Erreur serveur " + err);
        }
    } else {
        try {
            const user = await Users.update(
                {
                    profilePicture: req.params.img,
                },
                { where: { id: req.params.id } }
            );
            res.status(200).json("Votre compte a été modifié " + req.params.img + " " + req.params.id);
            return;
        } catch (err) {
            return res.status(500).json("Erreur serveur " + err);
        }
    }
    //} else {
    //    return res.status(403).json("Vous pouvez modifiez uniquement votre compte");
    //}
});

module.exports = router;
