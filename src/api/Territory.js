import authorizedApiCall from "./AuthorizedApiCall";

const TerritoryApi = {
    getAllTerritories: function(zoneId='') {
        return new Promise(function (resolve, reject) {
            authorizedApiCall('GET', `/all_territories/${zoneId}`)
                .then(function(res) {
                   resolve(res.data);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },

    saveTerritory: function(territoryCode, territoryName, zoneId) {
        return new Promise(function (resolve, reject) {
            authorizedApiCall('POST', '/create_territory', {
                TerritoryID: territoryCode,
                Territory: territoryName,
                ZoneID: zoneId
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

export default TerritoryApi;