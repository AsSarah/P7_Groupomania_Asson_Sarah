import "./online.css";


//// parti concernant les utilisateurs en ligne ( dummy data)
export default function Online({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfilImgContainer">
        <img className="rightbarProfilImg" src={user.profilePicture} alt="" />
        <span className="rightbarOnline"></span>{" "}
        {/*Création de la bille verte pour la simulation d'amis connectés */}
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
