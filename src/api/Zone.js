import swal from "sweetalert";
import authorizedApiCall from "./AuthorizedApiCall";
const ZoneApi = {
    getAllZones: function() {
        return new Promise(function (resolve, reject) {
            authorizedApiCall('GET', '/all_zones')
                .then(function (res) {
                   resolve(res.data);
                })
                .catch(function(err) {
                    swal("Error!", "Error occurred while fetching zones", "error");
                });
        });
    },

    saveZone: function(zoneCode, zoneName) {
        return new Promise(function (resolve, reject) {
           authorizedApiCall('POST', '/create_zone', {
               ZoneID: zoneCode,
               Zone: zoneName
           })
           .then(function (res) {
               resolve(res);
           })
           .catch(function (err) {
               reject(err);
           })
        });
    }
}

export default ZoneApi;