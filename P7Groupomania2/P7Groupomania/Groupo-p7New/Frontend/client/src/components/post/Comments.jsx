import "../share/share.css";
import "./post.css";
import { Delete } from "@material-ui/icons"
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ComsService from "../../services/ComsService";



//// partie concernant les commentaires, en fonction des posts
export function CommentsShare({ postID, showComments, setShowComments }) {

    const [coms, setComs] = useState([]);
    const [userWhoPosted, setUserWhoPosted] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const desc = useRef();
    const setShowComment = setShowComments;
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [showModif, setshowModif] = useState(true);

    useEffect(() => {
        ComsService.get(postID).then((res) => {
            setComs(res.data);
            console.log(res.data[0].userId);
        });
    }, [postID]);

    // gestion de la publication d'un commentaire
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            desc: desc.current.value,
        };
        try {
            // creation d'un commentaire, pour l'utilisateur, sur le post , avec les informations contenu dans la variable newPost
            ComsService.create(user.id, postID, newPost).then((res) => {
                refreshData();
            });
        } catch (err) {
            console.log(err);
        }
    };

    // rafraissisement des commentaires
    const refreshData = () => {
        setComs(null);
        setCurrentIndex(-1);
        setShowComment(!showComments);
    };
    const changeModif = () => {
        setshowModif(!showModif);
    }

    //gestion de la suppression des commentaire
    function deleteHandler(id) {
        try {
            // suppression en ciblant l'id du commentaire, le post ou il est présent, et l'utilisateur concerné
            ComsService.remove(id, postID, user.id)
                .then((res) => {
                    console.log(res);

                    // recupéré du composant parent, permet de masqué / afficher la zone des commentaire
                    setShowComment(!showComments);
                })
                .catch((e) => {
                    console.log(e.response.data);
                });
        } catch (err) {
            console.log(err);
        }
    };

    function handleModifCOm(id) {
        console.log(desc.current.value)
        try {
            // creation d'un commentaire, pour l'utilisateur, sur le post , avec les informations contenu dans la variable newPost
            ComsService.update(id, user.id, postID, desc.current.value).then((res) => {
                console.log(res.data)
                setShowComment(!showComments);
            });
        } catch (err) {
            console.log(err);
        }

    };



    return (
        <div>
            <div className="share">
                <div className="shareWrapper">
                    <div className="shareTop">
                        {/*Partie contenant l'image de profil */}

                        <input
                            placeholder={"Laissez un commentaire " + user.username + " ?"}
                            className="shareInput"
                            ref={desc}
                        />
                    </div>
                    <hr className="shareHr" />

                    <form className="shareBottom" onSubmit={submitHandler}>
                        {/*Partie contenant les fonctionalités */}

                        <button className="shareButton" type="submit">
                            Publier
                        </button>
                    </form>
                </div>
            </div>
            {coms ? (
                <div className="share">
                    <div className="shareWrapper">
                        <div className="postCenter">{/*Partie centrale qui contient les éléments du post */}
                            {coms.map((c) => (

                                <div className="share shareWapper" key={c.id}>
                                    <div className="postTop">
                                        <div className="postTopLeft" >
                                            <img

                                                className="postProfilImg"
                                                src={
                                                    userWhoPosted.profilePicture
                                                        ? "http://localhost:4200/images/" + userWhoPosted.profilePicture
                                                        : PF + "person/noAvatar.png"
                                                }
                                                alt=""
                                            />
                                            {c.username}
                                        </div>
                                        <div className="postTopRight">
                                            {/*Bouton supprimer */}
                                            {c.userId == user.id || user.isAdmin ? (
                                                <Delete className="postDeleteButton" onClick={() => deleteHandler(c.id)} />
                                            ) : (
                                                <span className="postText"></span>
                                            )}
                                        </div>
                                    </div>
                                    {c.userId == user.id ? (

                                        <form className="shareBottom" onClick={() => handleModifCOm(c.id)}>
                                            {/*Partie contenant les fonctionalités */}
                                            <div className="rightbarInfoItem">
                                                <span className="rightbarInfoKey"> Votre Commentaire:</span>

                                                {showModif ?
                                                    <div>
                                                        <span className="postText">
                                                            <img
                                                                className="commentIcon"
                                                                onClick={() =>
                                                                    setshowModif(!showModif)
                                                                } /*bouton pour activer les commentaires */
                                                                src="/assets/edit.png"
                                                                alt=""
                                                            />
                                                            {c.desc}
                                                        </span></div>
                                                    :
                                                    <div>
                                                        <input
                                                            placeholder={c.desc}
                                                            name="desc"
                                                            id="desc"
                                                            ref={desc}
                                                            required

                                                            className="loginInput"
                                                        />
                                                        <button className="shareButton" >
                                                            Modifier
                                                        </button>
                                                    </div>
                                                }
                                            </div>

                                        </form>
                                    ) : (
                                        <div className="postCenter postWrapper">
                                            <span className="postText">{c.desc}</span>

                                        </div>

                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="postTopRight">

                </div>
            )}
        </div>

    );
}

