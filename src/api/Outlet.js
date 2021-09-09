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
    },

    saveOutlet: function(outletCode, outletName, outletTerritory, outletAddress, contactPerson, outletPhone, assignedSR) {
        return new Promise(function(resolve, reject) {
           authorizedApiCall('POST', '/create_outlet', {
               OutletCode: outletCode,
               OutletName: outletName,
               OutletAddress: outletAddress,
               ContactPerson: contactPerson,
               OutletPhone: outletPhone,
               AssignedSR: assignedSR,
               TerritoryID: outletTerritory
           }).then(function(res) {
              resolve(res);
           }).catch(function(err) {
               reject(err);
           });
        });
    },
    getOutletsWithPagination: function (currentPage, pagination) {
        return new Promise(function(resolve, reject) {
            authorizedApiCall('GET', `/outlet_with_pagination/${currentPage}/${pagination}`)
                .then(function(res) {
                    console.log(res.data);
                    resolve({
                        data: res.data.data,
                        page: currentPage-1,
                        totalCount: res.data.total_count
                    });
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    }
}

export default OutletApi;