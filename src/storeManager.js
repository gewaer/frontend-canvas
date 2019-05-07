const hibookStoreFiles = require.context("./custom-stores/hibooks-store/", false, /\.js$/);
const applicatioStoreFiles = require.context("./store/", false, /\.js$/);


function loadStores(files) {
    const store = {};

    files.keys().forEach(key => {
        if (key !== "./index.js") {
            store[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
        }
    });

    return store;
}

const hibookStore = loadStores(hibookStoreFiles);
const applicationStore = loadStores(applicatioStoreFiles);
const mergedStore = Object.assign(hibookStore, applicationStore);

export default mergedStore;

