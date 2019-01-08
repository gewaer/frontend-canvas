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
