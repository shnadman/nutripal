import axios from "axios";

export default axios.create({
  baseURL: "https://autocomplete.clearbit.com/v1/companies/suggest",
  timeout: 2000,
});
