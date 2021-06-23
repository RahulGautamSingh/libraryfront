import axios from "axios";
export default function setupInterceptors(history) {
  axios.defaults.baseURL = "http://localhost:3300/";
  axios.interceptors.request.use(
    function (req) {
      let token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
      } else {
        req.headers["authorization"] = "Bearer " + token;
      }
      return req;
    },
    function (error) {
      console.log("Error Faced!", error.message);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (res) {
      console.log(res)
      return res;
    },
    async function (error) {
      console.log(error)
      let originalRequest = {};
     
      let status = error?.response?.status;

      if (
        status === 403 &&
        localStorage.getItem("token") &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        await refreshToken();
        return axios(originalRequest);
      } else if(status===403 || status===401) history.push("/login");

      return Promise.reject(error);
    }
  );

  async function refreshToken() {
    let refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    console.log(refreshToken)
    let token = await axios.post("auth/token", {
      body: {
        token: "Bearer " + refreshToken,
      },
      headers: {
        "Content-type": "application/json",
      },
    });
    localStorage.setItem("token", token.access_token);
  }
}
