import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
    const email = useRef();
    const password = useRef();

    const { isFetching, dispatch } = useContext(AuthContext);

    //Creation fonctionnalité bouton login
    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
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
                            placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            placeholder="Mot de passe"
                            type="password"
                            required
                            minLength={6}
                            className="loginInput"
                            ref={password}
                        />
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching
                                ? (console.log(isFetching),
                                    (<CircularProgress color="white" size="20px" />))
                                : "Connexion"}
                        </button>
                        <span className="loginForgot">Mot de pase oublié ?</span>
                        <button className="loginRegisterButton">
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                "Créer un compte"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
