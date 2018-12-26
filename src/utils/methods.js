
export default {
    getTableData(apiUrl, options) {
        return axios({
            url: apiUrl,
            params: options.params
        });
    }
}
