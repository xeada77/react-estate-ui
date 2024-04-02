import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: false,
});

export default apiRequest;
