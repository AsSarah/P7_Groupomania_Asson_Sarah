import http from "../http-axios";
// feed timeline , tout les posts de tout  le monde
const getAll = () => {
  return http.get("/posts/timeline/all/");
};
// feed user, Tout les post d'une personne dans son profile
const getAllUser = (username) => {
  return http.get(`/posts/profile/${username}`);
};

 const create = (data) => {
     return http.post("/posts/", data);
 }
;
const update = (id, userId) => {
  return http.put(`/posts/${id}/like/${userId}`);
};
// suppression d'un post d'un user autorisé ( admin ou createur du pos)
 const remove = (id, userId) => {
     return http.delete(`/posts/${id}/${userId}`);
 };
// const removeAll = () => {
//     return http.delete(`/tutorials`);
// };
// const findByTitle = title => {
//     return http.get(`/tutorials?title=${title}`);
// };
const PostService = {
  getAll,
  getAllUser,
   create,
  update,
   remove,
  // removeAll,
  // findByTitle
};
export default PostService;
