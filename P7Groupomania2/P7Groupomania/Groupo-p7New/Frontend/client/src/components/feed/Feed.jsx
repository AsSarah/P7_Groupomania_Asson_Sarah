import { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import "./feed.css";
import PostService from "../../services/PostService";
import Post from "../post/Post";
import { AuthContext } from "../../context/AuthContext";

/// Partie timeline//////////////////////////////////////
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

// on parcours les posts
  const fetchPosts = () => {
    // si pas de username dans les parametre, c'est qu'on est sur la timeline et donc on recupere tout les posts
    if (!username) {
      PostService.getAll()
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => console.log("L'erreur est : " + err));
    } else {
      // sinon c'est qu'on est sur le profil et on recupere les posts du profil concerné
      PostService.getAllUser(username)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => console.log("L'erreur est : " + err));
    }
    };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
              <Share posts={posts}/>
        {/* permet la publication du post */}
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
