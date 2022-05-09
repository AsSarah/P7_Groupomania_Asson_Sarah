import http from "../http-axios";

const create = (userID, postId) => {
    return http.post(`/likes/${userID}/${postId}/`);
};

// const create = data => {
//     return http.post("/", data);
// };
const update = () => {
  return http.put(`/likes/`);
};
// const remove = id => {
//     return http.delete(`/tutorials/${id}`);
// };
// const removeAll = () => {
//     return http.delete(`/tutorials`);
// };
// const findByTitle = title => {
//     return http.get(`/tutorials?title=${title}`);
// };
const LikeService = {
  create,
  
  // create,
  update,
  // remove,
  // removeAll,
  // findByTitle
};
export default LikeService;
