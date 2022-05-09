const router = require("express").Router();

const db = require("../config/db.config");
const Post = db.post; // récupére le modele User//
const Users = db.users;
const Like = db.like;
const Coms = db.coms;

//Créer un post //

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Modifier un post //

router.put("/:id", async (req, res) => {
    try {
        // const post = await Post.findById(req.params.id);
        if (req.body.userId === req.params.id) {
            const posts = await Post.update(
                { desc: req.body.desc },
                { where: { id: req.params.id } }
            );
            //   const posts = await Post.update(newPost, { where });
            res.status(200).json("Votre post a bien été modifié");
        } else {
            res.status(403).json("Vous pouvez modifier uniquement votre post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
//Supprimer un post //

router.delete("/:id/:userId", async (req, res) => {

    const isadmin = await Users.findOne({
        where: {
            id: req.params.userId
        }
    });
    try {
        // verifidcation de possibilité de suppression de post
        const theCreator = await Users.findOne({ where: { id: req.params.userId } });
        const thePost = await Post.findOne({ where: { id: req.params.id } });

        if (theCreator.id == thePost.userId || isadmin.isAdmin) {
            thePost.destroy();
            const lesComms = await Coms.destroy({
                where: {
                    PostId: req.params.id,
                }
            });
            res.status(200).json("Votre post a bien été supprimé" +
                "/" + req.params.id +"/" + req.params.userId +
                " creator Id  " + theCreator.id +
                " et post user id " + thePost.userId +
                lesComms.data);
            return;
        } else {
            res.status(403).json("Vous pouvez supprimer uniquement  votre post " +
                "/" + req.params.id + "/" + req.params.userId +
                " creator Id  " + theCreator.id +
                " et post user id " + thePost.userId);
            return;
            
        }
      
    } catch (err) {
        res.status(500).json(err);
    }
});

//Like/dislike un post //

router.put("/:id/like/:userId", async (req, res) => {
    try {
        console.log("test de " + req.body.PostId);
        const theLiked = await Post.findOne({ id: req.params.id });
        const isLiked = await Like.findOne({
            where:
            {
                PostId: req.params.id,
                userId: req.params.userId
            }
        });


        if (isLiked.Isliked === 1) {// si n'aime pas
            const posts = await Post.increment(
                { likes: 1 },
                { where: { id: req.params.id } }
            );
            res.status(200).json("Votre post a été liker " + theLiked.id);
        } else if (isLiked.Isliked === 0) { //si aime
            const posts = await Post.decrement(
                { likes: 1 },
                { where: { id: req.params.id } }
            );
            res.status(200).json("Like retiré");
        } else { // si null ( et donc creation du j'aime)
            const posts = await Post.increment(
                { likes: 1 },
                { where: { id: req.params.id } }
            );
            res.status(200).json("Votre post a été liker " + theLiked.id);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Afficher un post //
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});
//Afficher un  utilisateur par son username//

//Afficher timeline (des amis qu'on suit) tous  les posts //
router.get("/timeline/all", async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            raw: true,
            order: [
                ['id', 'DESC']]
        });

        res.json(allPosts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/profile/:username", async (req, res) => {
    try {
        const user = await Users.findOne({
            where: { username: req.params.username },
        }); //  permet de récupérer un unique utilisateur//

        const posts = await Post.findAll({ where: { userId: user.id } });
        // permet de récupérer les posts d'un utilisateur//

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/upload", function (req, res) {
    const form = new formidable.IncomingForm();
    // Parse `req` and upload all associated files
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        const [firstFileName] = Object.keys(files);

        res.json({ filename: firstFileName });
    });
});
module.exports = router;
