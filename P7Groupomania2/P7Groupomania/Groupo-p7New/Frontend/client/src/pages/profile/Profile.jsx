import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { ImageSearch, PermMedia } from "@material-ui/icons";
import axios from "axios";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;


    const [user, setUser] = useState({});
    const [file, setFile] = useState(null)
    const { user: currentUser } = useContext(AuthContext);

    const fetchUser = (username) => {
        UserService.getName(username)

            .then((res) => {
                setUser(res.data);
                console.log("le id params " + currentUser.id)
                //console.log("bou");
                // console.log(res.data);

            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchUser(username);
    }, [username]);

    const submitHandlerC = async (e) => {
        e.preventDefault();
        console.log("je suis la");
        if (file) {
            const data = new FormData();
            const fileName = file.name;
            data.append("name", fileName);
            data.append("file", file);
            //console.log(fileName);
            const isImg = "Cover";

            try {
                await axios.post("/upload", data);
            } catch (err) { }
            try {
                UserService.updateImg(currentUser.id, fileName, isImg).then((res) => {
                    window.location.reload();
                })

            } catch (err) { }
        }

    };
    const submitHandlerP = async (e) => {
        e.preventDefault();
        console.log("je suis la");
        if (file) {
            const data = new FormData();
            const fileName = file.name;
            data.append("name", fileName);
            data.append("file", file);
            //console.log(fileName);
            const isImg = "Profil";

            try {
                await axios.post("/upload", data);
            } catch (err) { }
            try {
                UserService.updateImg(currentUser.id, fileName, isImg).then((res) => {
                    let profile = JSON.parse(localStorage["user"]);
                    profile.profilePicture = fileName;
                    localStorage["user"] = JSON.stringify(profile);
                    window.location.reload();
                })

            } catch (err) { }
        }
    };

    const destroyAccount = (userId) => {
        UserService.remove(user.id).then((res)=>{
            localStorage.clear();
            window.location.href = '/';
            //console.log(user.profilePicture);
        })


    }

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    user.coverPicture
                                        ? "http://localhost:4200/images/" + user.coverPicture
                                        : PF + "person/noCover.jpg"
                                }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={
                                    user.profilePicture
                                        ? "http://localhost:4200/images/" + user.profilePicture
                                        : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                            <form className="shareBottom" onSubmit={submitHandlerC}>
                                {/*Partie contenant les fonctionalités */}
                                <div className="shareOptions">
                                    <label htmlFor="file" className="shareOption">
                                        <ImageSearch htmlColor="tomato" className="shareIcon" />
                                        <span className="shareOptionText">Modifier l'image de couverture</span>
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            id="file"
                                            accept="png,jpeg,jpg,gif"
                                            onChange={(e) => setFile(e.target.files[0])}

                                        />
                                    </label>


                                </div>
                                <button className="shareButton" type="submit">
                                    Valider l'image de couverture
                                </button>
                            </form>
                        </div>

                        <div className="profileInfo">
                            <form className="shareBottom" onSubmit={submitHandlerP}>
                                {/*Partie contenant les fonctionalités */}
                                <div className="shareOptions">
                                    <label htmlFor="file" className="shareOption">
                                        <ImageSearch htmlColor="tomato" className="shareIcon" />
                                        <span className="shareOptionText">Modifier l'image de profile</span>
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            id="file"
                                            accept="png,jpeg,jpg,gif"
                                            onChange={(e) => setFile(e.target.files[0])}

                                        />
                                    </label>


                                </div>
                                <button className="shareButton" type="submit">
                                    Valider
                                </button>
                            </form>
                            <h4 className="profileInfoName">{user.username}</h4>

                            <span className="profileInfoDesc"> {user.desc}</span>
                            {user.id === currentUser.id ? (
                                < button className="profileInfoDesc" onClick={() => destroyAccount(user.id)}>
                                    Suppression du compte
                                </button>
                            ) : (
                                    <div></div>
                                    )}
                               
                          
                        </div>

                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}
