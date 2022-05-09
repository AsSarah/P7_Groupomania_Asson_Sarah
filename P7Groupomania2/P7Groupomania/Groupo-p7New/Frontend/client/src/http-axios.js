import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:4200/api/",
  headers: {
    "Content-type": "application/json,multipart/form-data",
  },
});
