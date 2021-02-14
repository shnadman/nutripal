import axios from "axios";

export default axios.create({
  baseURL: `${"http://localhost:3000"}/api/users`,
  timeout: 2000,
});
