import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class BackendService {
  async getAllVaders(){
    const vaderList= await axios.get("http://localhost:5000/vader/all")
    console.log("Here is listof Vader ",vaderList)
    return vaderList;
  }
  async createVader(data){
    axios.defaults.crossDomain = true;
      data['headers']={"Access-Control-Allow-Origin": '*'}
      console.log("DATA Before Sending ",data)
    return await axios.post("http://localhost:5000/vader/create",data)
  }

  async getAllVaderAggregation(){
    return await axios.get("http://localhost:5000/vader/agg")
  }
  
async getAddress(pincode){
  return await axios.get("http://164.52.200.133:8090/api/configuration-management/get-address?pincode="+pincode)
}

  async createUser(data){
    axios.defaults.crossDomain = true;
      data['headers']={"Access-Control-Allow-Origin": '*'}
      console.log("DATA Before Sending ",data)
    return await axios.post("http://localhost:5000/api/user/register",data)
  }
  async getAllUsers(){
    return await axios.get("http://localhost:5000/user/api/allusers")
  }
  
  async getUserBoard() {
    return await axios.get("/api/test/user");
  }

  async getPmBoard() {
    return await axios.get("/api/test/pm");
  }

  async getAdminBoard() {
    return await axios.get("/api/test/admin");
  }
}

export default new BackendService();