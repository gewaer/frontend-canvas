module.exports = {
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                "@v": `${__dirname}/src/views`
            }
        }
    }
}
