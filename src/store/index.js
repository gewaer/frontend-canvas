/**
 * Dynamically import store elements.
 */
const files = require.context(".", false, /\.js$/);
const store = {};

files.keys().forEach(key => {
    if (key !== "./index.js") {
        store[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
    }
});

export default store;
