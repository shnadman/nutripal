import axios from "axios";
const prod = "https://nutrition-server.herokuapp.com";
export default axios.create({
  baseURL: prod,
  timeout: 2000,
});
