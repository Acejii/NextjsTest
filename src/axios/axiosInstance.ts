import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/`,
  timeout: 10000,
  auth: {
    username: 'admin',
    password: "wBtt$b+FwvKSf2Y8"
  },
  headers: {
    'X-Custom-Header': 'foobar',
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;
