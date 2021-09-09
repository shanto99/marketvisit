import authorizedApiCall from "./AuthorizedApiCall";

const authHelpers =  {
    logIn: function (userId, password) {
        return new Promise(function(resolve, reject) {
            authorizedApiCall('POST', '/login', {
                UserID: userId,
                Password: password
            }).then(function(res) {
                let userObj = res.data.data;
                console.log(userObj);
                localStorage.setItem('marketvisit-user', JSON.stringify(userObj));
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
                   resolve(res);
                   localStorage.removeItem('marketvisit-user');
                })
               .catch(function(err) {
                   localStorage.removeItem('marketvisit-user');
                   if(reject) reject(err);
                   else console.log(err);
               })
        });
    }
}

export default authHelpers;