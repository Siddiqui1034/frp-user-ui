import axios from "axios";  

//AJAX interceptors
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = " "
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.status===302){
// can send to login page to login user
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export class Ajax{
    static sendGetReq(url){
        return axios.get(url)
     }
    static sendPostReq(url, data){
        return axios.post(url, data)
     }
    static sendPutReq(url, data){
        return axios.put(url, data)
     }
    static sendDeleteReq(url){
        return axios.delete(url)
     }
}