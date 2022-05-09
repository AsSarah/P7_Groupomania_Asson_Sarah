import "./topbar.css";
import {

    Person,
    Chat,
    Notifications,
} from "@material-ui/icons"; /*Icones utilisées */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Topbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const Logout = () => {
        localStorage.clear();
        window.location.href = '/';
        //console.log(user.profilePicture);
    }

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    {/*Lien vers la page d'accueil */}
                    <span className="logo">Groupomania </span> {/*Logo Groupomania */}
                </Link>
            </div>
            <div className="topbarCenter">

            </div>
            <div className="topbarRight">

                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={
                            user.profilePicture
                                ? "http://localhost:4200/images/" + user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="topbarImg"
                    />
                </Link>
                <div className="topbarLinks">

                    <span className="topbarLink" onClick={Logout}>Deconnection</span>

                </div>
            </div>
        </div>
    );
}
