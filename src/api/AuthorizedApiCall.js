import axios from "axios";
import baseUrl from "../BaseApiUrl";

const authorizedApiCall = (method, endPoint, payload) => {
    let user = localStorage.getItem('marketvisit-user');
    if(user) user = JSON.parse(user);
    let token = user && user.token;
    return new Promise(function (resolve, reject) {
        try{
            axios({
            method: method,
            url: baseUrl+endPoint,
            data: payload,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
            }).then(function(res) {
                resolve(res);
            }).catch(function(err) {
                if(reject) {
                    reject(err);
                }
            });
        } catch(error) {
            reject(error);
        }
        
    })
}

export default authorizedApiCall;