import axios from "axios";

const prod = "https://nutrition-server.herokuapp.com";
export default axios.create({
  baseURL: `${prod}/api/users/me`,
  timeout: 2000,
});
