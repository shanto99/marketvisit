import authorizedApiCall from "./AuthorizedApiCall";
const OutletApi = {
    getAllOutlets: function() {
        return new Promise(function (resolve, reject) {
           authorizedApiCall('GET', '/all_outlets')
               .then(function(res) {
                   resolve(res.data);
               })
               .catch(function (err) {
                  reject(err);
               });
        });
    }
}

export default OutletApi;