import axios from "axios";
export default axios.create({
  baseURL:import.meta.env['VITE_APP_BASEURL'] as string || 'http://localhost:5000' ,
  withCredentials:true,
})

