import axios from "axios";

const at = "D0B3svRsNMCQcIVHO7VxA824Q5eHaziJQ3U7ab7llys2QwJnZ2lAUL_CbybuWnUX";
const base_url = "";

const api = axios.create({
  baseURL: "http://api.genius.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization:
      "Bearer D0B3svRsNMCQcIVHO7VxA824Q5eHaziJQ3U7ab7llys2QwJnZ2lAUL_CbybuWnUX"
  }
});

export default api;
