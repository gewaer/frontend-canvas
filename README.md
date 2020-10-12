# Gewaer Frontend Kanvas

This guide will help you set up the project.

## Setup

Just the basic stuff, really.

`npm install`

### Environment

Do a copy of `.env.example` and rename it according to the development environment you want to the application in.

`.env.development` for development.

`.env.production` for production.

### Local Packages

For ease of development we use the other required @gewaer packages locally. We achieve this by having two different `import` files. One to pull from npm, the other to pull from local repos.

These files already exist within `/src`. All you need to do to switch between them is go to the `.env.development` file and change the variable `VUE_APP_IMPORTS=` to either `local` or `npm`.

#### Note

I know of `npm link`. However, when I publish the packages I like to install them through npm and make sure they are working properly.

## Commands

command | description
------- | -----------
npm run serve | Run a live server for testing the application during development.
npm run build | Compile a production ready version of the application.
npm run dev | Compile a development testing version of the application.
npm run lint | Run a linter pass through to fix those shameful formatting mistakes left behind.

## CASL (ACL)

Frontend Kanvas makes use of Access Control List via a very useful library called [CASL](https://casl.js.org/v4/en/guide/intro),
implemented via the [CASL VueJS package](https://casl.js.org/v4/en/package/casl-vue).

### Basic Premise

User permissions are fetched from the API after login. Permissions are then set in a `no-access` policy, meaning:
when first initialized the ACL is set to `all-access` and then access is restricted based on what is received from the
API. The user is not allowed to continue into the application until all permissions have been set.

This method allows for less cluttered permissions, since you only specify what you want to restrict (less) instead of
all you want to allow (more).

The application is injected with the global `$ability` class by `Vue.use(AbilitiesPlugin)`, and also the move
convinient `$can` and `$cannot`.

### Some Examples

The `AbilityBuilder` is used to set the initial state of the ACL: `can("manage", "all")`. After which restrictions are
placed with `cannot(action, resource)`.

From there on, and in the same way, you can verify if a user has access to (or not) either routes or sections of
the application.

`this.$can("edit", "companies")` will return either `true` or `false` on whether the use can or cannot edit information
for a company.
(`this.$cannot("edit", "companies")` can similarly be used, remember it will return an opposite value to `$can`.)
