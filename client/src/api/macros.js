import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/macros",
  timeout: 2000,
  params: {
    select: "",
    limit: "8 ",
    sort: "score",
  },
});
