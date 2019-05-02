import * as titleCase from "lodash/capitalize";

export function capitalize(value) {
    return titleCase(value);
}

export function resizeCoverUrl(url, width = 220, height = 220) {
    const newUrl = url.split("?")[0];
    return newUrl + `?height=${height}&width=${width}`;
}
