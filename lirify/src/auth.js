import cookies from "js-cookie";

export const isAuthenticated = () => {
  var access_token = cookies.get("cookieAccessToken");
  if (access_token) {
    return true;
  } else {
    return false;
  }
};
