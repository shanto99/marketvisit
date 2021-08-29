import authorizedApiCall from "./AuthorizedApiCall";

const authHelpers =  {
    logIn: function (userId, password) {
        return new Promise(function(resolve, reject) {
            authorizedApiCall('POST', '/login', {
                UserID: userId,
                Password: password
            }).then(function(res) {
                let token = res.data.data.token;
                console.log(token);
                localStorage.setItem('marketvisit-user', token);
                resolve(res);
            }).catch(function (err) {
                if(reject) reject(err);
                else console.log(err);
            })
        });
    },
    logOut: function() {
        return new Promise(function(resolve, reject) {
           authorizedApiCall('POST', '/logout')
               .then(function(res) {
                   localStorage.removeItem('marketvisit-user');
                   resolve(res);
                })
               .catch(function(err) {
                   if(reject) reject(err);
                   else console.log(err);
               })
        });
    }
}

export default authHelpers;