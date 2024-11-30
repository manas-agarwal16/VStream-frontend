import axios from "axios";
import {BACKEND_URL} from "../constants.js"

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BACKEND_URL;
axiosInstance.defaults.withCredentials = true;

export {axiosInstance};