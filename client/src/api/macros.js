import axios from "axios";
const local = "http://localhost:3000";
const prod = "https://nutrition-server.herokuapp.com";
export default axios.create({
  baseURL: `${local}/api/macros`,
  timeout: 15000,
  params: {
    limit: "18",
  },
});
