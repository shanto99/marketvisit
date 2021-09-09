import authorizedApiCall from "./AuthorizedApiCall";
const DashboardApi = {
    getDashboardData: function() {
        return new Promise(function(resolve, reject) {
           authorizedApiCall('GET', '/get_dashboard_data')
               .then(function(res) {
                   resolve(res.data);
               })
               .catch(function(err) {
                   reject(err);
               })
        });
    }
}

export default DashboardApi;