
export default {
    getTableData(apiUrl, options) {
        return axios({
            url: apiUrl,
            params: options.params
        });
    },
    uids() {
        return Math.random().toString(16).replace(".", "");
    }
}
