const router = require("express").Router();
const db = require("../config/db.config");
const Users = db.users;
const Coms = db.coms;


//Création d'un commentaire

router.post("/:userId/:postId/:username/:desc", async (req, res) => {
    const newComs = new Coms({
        userId: req.params.userId,
        PostId: req.params.postId,
        username: req.params.username,
        desc: req.params.desc
    });
    try {
        const savecComs = await newComs.save();
        res.status(200).json(savecComs);
    } catch (err) {
        res.status(500).json(err);
    }
});

//modification d'un commentaire

router.put("/:comId/:userId/:postId/:desc", async (req, res) => {
   
    try {
        const coms = await Coms.update(
            {
                desc: req.params.desc,
            },
            { where: { id: req.params.comId } }
        );
        res.status(200).json(coms);
    } catch (err) {
        res.status(500).json(err);
    }
});

//recuperation des commentaires d'un post
router.get("/:postId", async (req, res) => {
    try {
        const allComs = await Coms.findAll({
            raw: true,
            where: {
                PostId: req.params.postId
            },
            order: [
                ['id', 'DESC']]
        });

        res.json(allComs);
    } catch (err) {
        res.status(500).json(err);
    }
});
//recuperation du user ayant poster ce commentaire
router.get("/:userId/:postId", async (req, res) => {
    try {
        const user = await User.findOne({
            raw: true,
            where: {
                id: req.params.userId
            },
           
        });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// suppression des commentaires
router.delete("/:comId/:postId/:userId", async (req, res) => {

    const isadmin = await Users.findOne({
        where: {
            id: req.params.userId
        }
    });
    try {
        // verifidcation de possibilité de suppression de post
        const theCreator = await Users.findOne({ where: { id: req.params.userId } });

        const theCom = await Coms.findOne({ where: { id: req.params.comId } })

        // si le createur du commentaire et le meme que celui qui cherche a le supprimer ou si l'utilisateur est un admin
        if (theCreator.id == theCom.userId || isadmin.isAdmin) {
            theCom.destroy();
            res.status(200).json("Votre commentaire a bien été supprimé   " + theCreator.id);
            return;
        } else {
            res.status(403).json("Vous pouvez supprimer uniquement  votre commentaire ");
            return;
            //res.status(404).json("Utilisateur non trouvé");
        }
    } catch (err) {
        res.status(500).json("hum..." + err);
    }
})

module.exports = router;
