import axios from "axios";
console.log(process.env);
export default axios.create({
  baseURL:process.env.VUE_APP_BASE_URL || 'http://localhost:5000',
  withCredentials:true,
})


