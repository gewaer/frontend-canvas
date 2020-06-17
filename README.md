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
