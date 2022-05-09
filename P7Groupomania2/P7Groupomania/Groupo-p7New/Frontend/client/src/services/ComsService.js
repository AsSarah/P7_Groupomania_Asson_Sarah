import http from "../http-axios";
///// gestions des routes des commentaire front > back

const create = (userId, postId, data) => {
    return http.post(`/coms/${userId}/${postId}/${data.username}/${data.desc}`);
};
const update = (comId, userId, postId, desc) => {
    return http.put(`/coms/${comId}/${userId}/${postId}/${desc}`);
};

const get = ( postId) => {
    return http.get(`/coms/${postId}`);
};

const remove = (comId, postId, userId) => {
    return http.delete(`/coms/${comId}/${postId}/${userId}`);
};

const getUser = (userId, postId) => {
    return http.get(`/coms/theuser/${userId}/${postId}`);
};


const ComsService = {
   get,
    create,
    getUser,
    remove,
     update,
    // findByTitle
};
export default ComsService;
