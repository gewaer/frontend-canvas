module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/main.scss";`
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@v": `${__dirname}/src/views`
            }
        }
    }
}
