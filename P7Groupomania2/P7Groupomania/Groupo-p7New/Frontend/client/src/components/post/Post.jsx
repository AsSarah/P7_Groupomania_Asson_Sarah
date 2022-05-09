import "./post.css";
import { Delete } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LikeService from "../../services/LikeService";
import PostService from "../../services/PostService";
import { CommentsShare } from "./Comments";

// Partie concernant les posts
export default function Post({ post }) {
    /*On récupére le paramétre post dans Share du fichier Feed.jsx */
    const [showComments, setShowComments] = useState(false);
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const Liked = post.likes.toString().includes(currentUser.id);
        setIsLiked(Liked);
    }, [currentUser.id, post.likes]);

    // ecuperation des information de l'utilisateur
    const fetchUser = (userId) => {
        UserService.get(userId)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchUser(post.userId);
    }, [post.userId]);

    // gestion des likes / dislikes 
    const likeHandler = () => {
        try {
            // mise à jour des likes / dislikes
            PostService.update(post.id, user.id)
                .then((res) => {
                    console.log(res);
                })
                .catch((e) => {
                    console.log(e.response.data);
                });
        } catch (err) {
            console.log(err);
        }
        try {
            // mise à jour du fait qu'un utilisateur ai deja aimé ou non le poste
            LikeService.create(currentUser.id, post.id).then((response) => {
                console.log(response.data);
            });
        } catch (err) {
            console.log(err);
        }
        setLike(
            isLiked ? (post.likes = post.likes - 1) : (post.likes = post.likes + 1)
        );
        setIsLiked(!isLiked);
       
    };


    // gestion de la suppression d'un post
    const deleteHandler = () => {
        try {
            //suppression du post, a condition que ce soit par son auteur / ou un admin
            PostService.remove(post.id, currentUser.id)
                .then((res) => {
                    console.log(res);
                    window.location.reload();
                })
                .catch((e) => {
                    console.log(e.response.data);
                });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    {/*Partie haute du post avec utilisateur et date */}
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img
                                className="postProfilImg"
                                src={
                                    user.profilePicture
                                        ? "http://localhost:4200/images/" + user.profilePicture
                                        : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        {/*On récupére nos userId du fichier dummyData, et on identifie l'utilisateur qui creer le post */}
                        <span className="postDate">{format(post.createdAt)}</span>{" "}
                        {/*Temps du post */}
                    </div>
                    <div className="postTopRight">
                        {/*Bouton supprimer */}
                        <Delete className="postDeleteButton" onClick={deleteHandler} />
                    </div>
                </div>
                <div className="postCenter">
                    {/*Partie centrale qui contient les éléments du post */}
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={"http://localhost:4200/images/" + post.img} alt="" />
                </div>
                <div className="postBottom">
                    {/*Partie basse du post avec boouton like et commentaire */}
                    <div className="postBottomLeft">
                        <img
                            className="likeIcon"
                            src="/assets/like.png"
                            onClick={likeHandler}
                            alt=""
                        />
                        {/*Bouton like */}
                        <span className="postLikeCounter">{like}</span>
                        {/*Affichage nombre de like */}
                    </div>
                    <div className="postBottomRight">
                        {/*Commentaire*/}
                        <img
                            className="commentIcon"
                            onClick={() =>
                                setShowComments(!showComments)
                            } /*bouton pour activer les commentaires */
                            src="/assets/comment.png"
                            alt=""
                        />
                        <span className="postCommentText">{post.comment} </span>
                    </div>
                </div>
                <div>{showComments && <CommentsShare postID={post.id} setShowComments={setShowComments} showComments={showComments} />}</div>
                {/* <div>{showComments && <Commentslist postID={post.id} />}</div>*/}
                {/* Partie commentaire */}
            </div>
        </div>
    );
}
