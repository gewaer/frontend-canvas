module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/main.scss";`
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
