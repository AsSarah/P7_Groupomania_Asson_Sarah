import http from "../http-axios";
//get user par son ID
// const get = (username) => {
//   return http.get(`/users/?username=${username}`);
// };
const get = (id) => {
  //utiliser dans Post.jsx
  return http.get(`/users/${id}`);
};

//Utiliser dans Profile.jsx
const getName = (username) => {
  return http.get(`/users/?username=${username}`);
};

const updateImg = (id,data, CoP) => {
    return http.put(`/users/profil/${id}/${data}/${CoP}`);
};


const update = (id,  poste, email) => {
    return http.put(`/users/${id}/${poste}/${email}`);
};

// const res = data => {
//     return http.post("/auth/login", userCredential);
// };
// const update = (id, data) => {
//     return http.put(`/tutorials/${id}`, data);
 //};


//suppression d'un compte
 const remove = id => {
     return http.delete(`/users/${id}`);
 };
// const removeAll = () => {
//     return http.delete(`/tutorials`);
// };
// const findByTitle = title => {
//     return http.get(`/tutorials?title=${title}`);
// };
const UserService = {
  get,
  getName,
  // res,
  update,
   updateImg,
   remove,
  // removeAll,
  // findByTitle
};
export default UserService;
