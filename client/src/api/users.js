import axios from "axios";
const local = "http://localhost:3000";

const prod = "https://nutrition-server.herokuapp.com";
export default axios.create({
  baseURL: `${local}/api/users`,
  timeout: 2000,
});
