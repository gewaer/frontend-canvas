import * as slug from "slugify";

export function isValidJWT(jwt) {
    return /^([a-z0-9_=]{4,})\.([a-z0-9_=]{4,})\.([a-z0-9_\-+/=]{4,})/i.test(jwt);
}

export function slugify(value) {
    return slug(value);
}
