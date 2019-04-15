import * as slug from "slugify";
import { toLower } from "lodash";

export function isValidJWT(jwt) {
    return /^([a-z0-9_=]{4,})\.([a-z0-9_=]{4,})\.([a-z0-9_\-+/=]{4,})/i.test(jwt);
}

export function slugify(value) {
    return slug(value);
}

export function lowercase(value) {
    return toLower(value);
}

export function isURL(str) {
    var pattern = new RegExp("^(https?:\\/\\/)?"+ // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|"+ // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))"+ // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"+ // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?"+ // query string
    "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
    return pattern.test(str);
}
