import axios from "axios";

const access_token = "";

const api = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/http://api.genius.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`
  }
});

export default api;
