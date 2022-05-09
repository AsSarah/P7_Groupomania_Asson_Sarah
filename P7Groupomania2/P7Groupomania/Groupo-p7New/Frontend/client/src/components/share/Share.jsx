import "./share.css";
import { PermMedia, Cancel } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();

    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user.id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = file.name;
            data.append("name", fileName);
            data.append("file", file);

            newPost.img = fileName;

            console.log(newPost.img);
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            await axios.post("/posts", newPost);

            window.location.reload();
        } catch (err) { }
    };


    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    {/*Partie contenant l'image de profil */}
                    <img
                        className="shareProfilImg"
                        src={
                            user.profilePicture
                                ? "http://localhost:4200/images/" + user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                    />
                    <input
                        placeholder={"Quoi de neuf " + user.username + " ?"}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    {/*Partie contenant les fonctionalités */}
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo ou video</span>
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
                        Publier
                    </button>
                </form>
            </div>
        </div>
    );
}
