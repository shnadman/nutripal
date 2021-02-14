import axios from "axios";

export default axios.create({
  baseURL: `${"http://localhost:3000"}/api/macros`,
  timeout: 15000,
  params: {
    limit: "18",
  },
});
