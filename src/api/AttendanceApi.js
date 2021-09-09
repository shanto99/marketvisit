import authorizedApiCall from "./AuthorizedApiCall";
const AttendanceApi = {
    getAttendances: function(userId, fromDate, toDate) {
        let endPoint = `/get_attendances/${fromDate}/${toDate}`;
        if(userId) endPoint = `/get_attendances/${fromDate}/${toDate}/${userId}`;
        return new Promise(function(resolve, reject) {
            authorizedApiCall('GET', endPoint).then(function(res) {
                resolve(res.data);
            }).catch(function(err) {
                reject(err);
            });
        })
    },
    getAttendanceImages: function(attendanceId)
    {
        return new Promise(function (resolve, reject) {
            authorizedApiCall('GET', `/attendance_images/${attendanceId}`)
                .then(function(res) {
                    resolve(res.data);
                }).catch(function(err) {
                    reject(err);
            })
        })
    },
    nationalOverview: function() {
        return new Promise(function (resolve, reject) {
            authorizedApiCall('GET', '/national_overview')
                .then(function(res) {
                    resolve(res.data);
                }).catch(function(err) {
                reject(err);
            })
        })
    }

}

export default AttendanceApi;