import authorizedApiCall from "./AuthorizedApiCall";
const UserApi = {
  saveUser: function(userId, userName, userPassword, userDesignation, userEmail, userPhone, userTerritory, userSupervisor) {
    return new Promise(function(resolve, reject) {
      authorizedApiCall('POST', '/register', {
        UserID: userId,
        UserName: userName,
        Password: userPassword,
        Designation: userDesignation,
        Email: userEmail,
        MobileNo: userPhone,
        TerritoryID: userTerritory,
        SupervisorID: userSupervisor
      }).then(function(res) {
        resolve();
      }).catch(function(err) {
        reject(err);
      })
    });
  },
  getAllUsers: function() {
    return new Promise(function (resolve, reject) {
      authorizedApiCall('GET', '/users')
      .then(function(res) {
        resolve(res.data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  deleteUser: function(userId) {
    return new Promise(function(resolve, reject) {
      authorizedApiCall('POST', '/delete_user', {
        UserID: userId
      }).then(function(res) {
        resolve(res);
      }).catch(function(err) {
        reject(err);
      });
    });
  }

};

export default UserApi;