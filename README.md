This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Highlights
- TypeScript
- PWA ready
- [react-query](https://react-query.tanstack.com/)
- [material-ui](https://material-ui.com/)
- [formik](https://formik.org/)
- [react-router](https://reactrouter.com/web)
- [styled-components](https://styled-components.com/)
- eslint
- prettier
- react-refresh
- [openapi-generator](https://openapi-generator.tech/)

### Includes
- Pre commit hooks using `husky` to prevent lint warnings and errors beeing commited
- Hooks for working with local storage
- Helper HOC to create contexts
- Hook for building forms with Formik
- Function for creating route props
- Spinner HOC for showing loading spinners in components, such as buttons
- Middleware for JWT token renewal
- Support for iOS safe-area

## Prerequisites

- A git client
  - See their [homepage](https://git-scm.com) for installation
  - If you want a gui, take a look at [Sourcetree](https://www.sourcetreeapp.com/)
- Node (their LTS version has been used, currently 14.0.0)
  - See their [homepage](https://nodejs.org) for installation
  - Run `node --version` to see which version you've got
- Yarn (their stable version has been used, currently 1.22.4)
  - See their [homepage](https://yarnpkg.com/en) for installation
  - Run `yarn -v` to see which version you've got
- A code editor - Visual Studio Code is recommended
- A local copy of the codebase

## Pre-setup
- If project is an `SPA`, edit `next.config.js` to use project as SPA.
- If `PWA` is not needed, remove `withPWA` and `pwa` settings in `next.config.js`. Also, add `react-router-dom` to `pages/index.ts`.
- Uncomment and update `sitemap` settings for `sitemap()` in `next.config.js` to generate `sitemap.xml` to be used with `Google Search Console`.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br />
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### Deploy build localy
To test service worker, we need to run build using https. To do this, generate certificate using [mkcert](https://github.com/FiloSottile/mkcert). Following their instructions on [GitHub](https://github.com/FiloSottile/mkcert).

When you have installed `mkcert` run below command to generate certificats which will be used when serving over HTTPS:

```
# Create rootCA-key.pem and rootCA.pem in your user folder and register them with your system
mkcert -install # Can be ran anywhere

# Generates local SSL certificates localhost-key.pem and localhost.pem to use when localy serving over HTTPS
mkcert localhost # Generated pem-files needs to be placed in root folder of project
```

### Build project and run project as SSR/SSG (Run on server)
```
yarn build
yarn start
```


### Build project as SPA (Static site)

Build project and serve it over HTTP using `serve`
```
# Build project
yarn export # Builds and export project to `out` dir

# Start webserver using HTTPS and our generated certificate on port 3001
serve -s out --ssl-cert localhost.pem --ssl-key localhost-key.pem

# Start webserver using HTTP on port 3001
serve -s out
```

### `yarn test`

Launches the test runner in the interactive watch mode.
*See section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.*

## Folder structure

We use `kebab-case` for all our files and folders in this project.

The folder structure used in this project is based of an article written by [Charles Stover](https://medium.com/@Charles_Stover) called [Optimal file structure for React applications](https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145)

- `public` is where our static files reside. (located outside of `src` folder.)
- `api` is where we keep all code for communicating with the backend. The content of this folder is preferably generated using [openapi-generator](https://openapi-generator.tech), see separate section below.
- `assets` is where any kind of asset, like images are place here.
- `components` contains all components of the application.
- `contexts` contains all contexts of the application.
- `config` contains routes and other configurable variables.
- `pages` is where we define all entry points referenced from the `routes.ts` file in `config` folder.
- `styles` contains all styling related code, such as global styling, theme and colors.
- `types` contains special type definition files for third party modules.
- `utilities` contains helper functions.
- `queries` contains hooks for fetching async data using react-query.

### Utilities folder `utilities`

This is a folder full of helper functions that are used globally.

### Components folder `components`

The `components` folder contains all components of the application. When creating a new component use kebab-case like so: `component-name`.

Each component can, but does not need to, contain the following type files:

- `[component name]-container.tsx` is your business logic and state management as handled before being sent to the stateless view Component.
- `[component name]-styles.ts` is where we store the styled components.
- `[component name]-view.tsx` is your stateless view Component. For the majority of cases, this Component should be able to be pure functional Component.
- `[component name].test.ts` are created for writing tests.
- `index.ts` is your entry point for importing your Component. It contains nothing but an export statement that points to the top-most Component at any point in time, because the top-most Component changes often during development.

The `components` folder can also host its own `utilities` and `components`.

### Queries folder `contexts`

The `contexts` folder contains all React contexts. There is a hook under `utilities` folder which converts a hook into context (`utilities/hook-to-context`), it's very nifty.

### Queries folder `queries`

The `queries` folder contains all hooks for fetching async data. Each file should be named `[type of query]-query.ts` and contain hooks for fetching, creating, updating that type, example: `post-query` would have hooks for `usePost`, `useUpdatePost`, `useDeletePost` etc.

### Using [Material-UI](https://github.com/mui-org/material-ui)

To alter Material-UI components we use [styled-components](https://github.com/styled-components/styled-components), read [here](https://material-ui.com/guides/interoperability/#styled-components) on how it works.


### Generate TypeScript from Open API spec

To generate typedefinitins for our API we use [openapi-generator](https://openapi-generator.tech). `openapi-generator` is provided as devdep in `package.json` and will be installed by running `yarn install` or `npm install`.

Generating the typedefinitions are done using the following command, except change url to your target Swagger API.

`yarn openapi-generator generate -i https://petstore.swagger.io/v2/swagger.json -g typescript-fetch -o ./src/api --additional-properties=supportsES6=true,typescriptThreePlus=true`

## Manifest

Uses generated manifest from [RealFaviconGenerator](https://realfavicongenerator.net/) [v0.16](https://realfavicongenerator.net/change_log#v0.16)