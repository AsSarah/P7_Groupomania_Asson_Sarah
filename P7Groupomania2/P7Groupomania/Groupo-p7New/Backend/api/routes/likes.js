const router = require("express").Router();
const db = require("../config/db.config");
const Like = db.like;


//Créer une correpondance User > post > like //

router.post("/:userID/:postId/", async (req, res) => {
    try {
        const newIsLike = new Like({ userId: req.params.userID, PostId: req.params.postId });
        // recuperation de la ligne dans la base correspondant au post dont l'user actuelle cherche a like/dislike
        const theLiked = await Like.findOne(
            {
                where: (
                    {
                        userId: req.params.userID,
                        PostId: req.params.postId
                    }
                )
            });
        // si pas encore de like
        if (theLiked === null) {
            const saveIslike = await newIsLike.save();
            res.status(200).json("Liaison creer " + theLiked + " " + newIsLike.userId);

        } else {
            // gestion des cas suivant : A aimeé, n'aime plus
            if (theLiked.Isliked === 1) { // si like créer et mis
                try {
                    // decrement de is liked : a zero on considere que le like est retiré
                    const saveIslike = await Like.decrement(
                        { Isliked: 1 },
                        { where: { userId: req.params.userID, PostId: req.params.postId } }
                    );
                    res.status(200).json("Like mis a jour + "
                        + theLiked.Isliked + " "
                        + theLiked.id + " userid "
                        + req.params.userID + " post id "
                        + req.params.postId);
                } catch (err) {
                    res.status(500).json("the erreur " + err);
                }

                // si like créer mais n'est plus mis
            } else if (theLiked.Isliked === 0) { 
                try {
                    // increment de is liked, a 1 on considere que le like est mis
                    const saveIslike = await Like.increment(
                        { Isliked: 1 },
                        { where: { userId: req.params.userID, PostId: req.params.postId } }
                    );
                    res.status(200).json("Like mis a jour - "
                        + theLiked.Isliked + " "
                        + theLiked.id + " userid "
                        + req.params.userID + " post id "
                        + req.params.postId);
                } catch (err) {
                    res.status(500).json("the erreur 2 " + err);

                }

            } else {
                res.status(200).json("Liaison etrange " + theLiked.Isliked);
            }
        }

    } catch (err) {
        res.status(500).json("attention");
    }
});


// modification du curseur indiquant si le user aime ou non ce post 
router.put("/", async (req, res) => {
    try {
       // si pas encore aimé
        if (req.body.Isliked === 0) {
            const isliked = await like.update(
                { Isliked: Boolean("true") },
                { where: { userId: req.params.id, PostId: req.param.PostId } }
            );
            res.status(200).json("Votre post Liké");
            // sinon c'est qu'on aime deja et on le retire
        } else {
            const isliked = await like.update(
                {
                    Isliked: Boolean("false")
                },
                { where: { userId: req.params.id, PostId: req.param.PostId } }
            );
            res.status(403).json("like retiré");
        }
    } catch (err) {
        res.status(500).json(err);
    }

})

module.exports = router;
