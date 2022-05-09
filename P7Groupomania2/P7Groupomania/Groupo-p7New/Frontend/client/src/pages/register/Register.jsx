import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./register.css";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity(
                "Le mot de passe ne correspond pas"
            );
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Groupomania</h3>
                    {/* <img
            className="loginLogo"
            src="../assets/Logos/icon-above-font.png"
            alt=""
          /> */}
                    <span className="loginDesc">Simplifiez vos prise de contact.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Nom d'utilisateur"
                            id="username"
                            name="username"
                            pattern="[A-Z][A-Za-z' -]+"
                            required
                            ref={username}
                            className="loginInput"
                        />
                        <input
                            placeholder="Email"
                            required
                            ref={email}
                            type="email"
                            className="loginInput"
                        />
                        <input
                            placeholder="Mot de passe"
                            required
                            minLength={6}
                            ref={password}
                            type="password"
                            className="loginInput"
                        />
                        <input
                            placeholder="Entrez à nouveau le mot de passe "
                            required
                            ref={passwordAgain}
                            type="password"
                            className="loginInput"
                        />
                        <button className="loginButton" type="submit">
                            S'inscrire
                        </button>

                        <button className="loginRegisterButton">
                            Connectez vous au compte
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
