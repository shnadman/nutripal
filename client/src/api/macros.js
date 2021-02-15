import axios from "axios";

const prod = "https://nutrition-server.herokuapp.com";
export default axios.create({
  baseURL: `${prod}/api/macros`,
  timeout: 15000,
  params: {
    limit: "18",
  },
});
