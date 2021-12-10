import axios from "axios";
export default axios.create({
  baseURL:'https://factura-0.herokuapp.com/' ,
  withCredentials:true,
})
//'http://localhost:5000'

