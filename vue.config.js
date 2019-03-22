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
                "@c": `${__dirname}/src/components`,
                "@v": `${__dirname}/src/views`
            }
        }
    }
}
