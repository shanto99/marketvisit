import axios from "axios";
import baseUrl from "../BaseApiUrl";

const authorizedApiCall = (method, endPoint, payload) => {
    let token = localStorage.getItem('marketvisit-user');

    return new Promise(function (resolve, reject) {
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
           reject(err);
        });
    })
}

export default authorizedApiCall;