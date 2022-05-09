import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import UserService from "../../services/UserService";
export default function Rightbar({ user }) {
    const { user: currentUser } = useContext(AuthContext);
    const email = useRef();

    const Poste = useRef();



    const handleClick = async (e) => {
        e.preventDefault();

        const user = {
            email: email.current.value,

            Poste: Poste.current.value,
        };
        try {
            console.log(user);
            // console.log(currentUser.id + " " + Poste.current.value + " " + username.current.value);

            UserService.update(currentUser.id, Poste.current.value, email.current.value).then((res) => {

                let profile = JSON.parse(localStorage["user"]);
                profile.email = email.current.value;
                profile.Poste = Poste.current.value;
                localStorage["user"] = JSON.stringify(profile);
                window.location.reload();
                //localStorage.clear();
                //window.location.href = '/login';
            })
            //await axios.post("/auth/register", user);
            //navigate("/login");
        } catch (err) {
            console.log(err);
        }

    };

    const HomeRightbar = () => {
        return (
            <>
                <h4 className="rightbarTitle">Collégues connectés</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };
    const ProfileRightbar = () => {

        return (
            <>
                {
                    user.id === currentUser.id ? (
                        <div className="share">
                            <div className="shareWrapper">
                                <h4 className="rightbarTitle">Information</h4>

                                <form className="shareBottom" onSubmit={handleClick}>
                                    <div className="rightbarInfo">
                                        <div className="rightbarInfoItem">
                                            <span className="rightbarInfoKey">Profil:</span>
                                            <span className="rightbarInfoValue">{user.email}</span>
                                            <input
                                                placeholder={user.email}
                                                required
                                                ref={email}
                                                type="email"
                                                className="loginInput"
                                            />
                                        </div>

                                        <div className="rightbarInfoItem">
                                            <span className="rightbarInfoKey">Poste:</span>
                                            <span className="rightbarInfoValue">{user.Poste}</span>
                                            <input
                                                placeholder="Poste"
                                                id="Poste"
                                                name="Poste"
                                                ref={Poste}
                                                required

                                                className="loginInput"
                                            />
                                        </div>
                                    </div>
                                    <button className="shareButton" type="submit">
                                        Publier
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                            <div className="share">
                                <div className="shareWrapper">
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Email:</span>
                            <span className="rightbarInfoValue">{user.email}</span>
                         </div>
                            <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Poste:</span>
                            <span className="rightbarInfoValue">{user.Poste}</span>
                                    </div>
                                </div>
                                </div>
                    )}

            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}
