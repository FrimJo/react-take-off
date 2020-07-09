This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This README describes the necessary steps to get a local development environment of the web app up and running.

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

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Deploy build localy


To test service worker, we need to run build using https, to do this please generate certificate using [mkcert](https://github.com/FiloSottile/mkcert). Please install it `mkcert` following the instructions in their [GitHub](https://github.com/FiloSottile/mkcert).

When you have installed `mkcert` run below command to generate certificats which will be used when serving over HTTPS:

```
# Create rootCA-key.pem and rootCA.pem in your user folder and register them with your system 
mkcert -install

# Generates local SSL certificates localhost-key.pem and localhost.pem to use when localy serving over HTTPS
mkcert localhost 
```

### `yarn build`
Then build and deploy using below commands:

```
# Build project
yarn build

# Add serve to your global modules
yarn global add serve

# Start webserver using our generated certificate on port 3001
serve -s build --ssl-cert localhost.pem --ssl-key localhost-key.pem
```

### `yarn test`

Launches the test runner in the interactive watch mode.
*See section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.*

## Folder structure

We use `kebab-case` for all our files and folders in this project.

The folder structure used in this project is based of an article written by [Charles Stover](https://medium.com/@Charles_Stover) called [Optimal file structure for React applications](https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145)

- `public` is where our static files reside. (located outside of `src` folder.)
- `api` is where we keep all code for communicating with the backend.
- `assets` is where any kind of asset, like images are place here.
- `components` contains all components of the application.
- `config` contains routes and other configurable variables.
- `pages` is where we define all entry points referenced from the `routes.ts` file in `config` folder.
- `styles` contains all styling related code, such as global styling, theme and colors.
- `types` contains special type definition files for third party modules.
- `utilities` contains helper functions.

### Utilities folder `utilities`

This is a folder full of helper functions that are used globally.

### Components folder `components`

The `components` folder contains all components of the application. When creating a new component use kebab-case like so: `component-name`.

Each component can, but does not need to, contain the following type files:

- `component-name-container.tsx` is your business logic and state management as handled before being sent to the stateless view Component.
- `component-name-context.tsx` is where the non local stat logic lies.
- `component-name-styles.ts` is where we store the styled components.
- `component-name-view.tsx` is your stateless view Component. For the majority of cases, this Component should be able to be pure functional Component (no hooks!).
- `index.ts` is your entry point for importing your Component. It contains nothing but an export statement that points to the topmost Component at any point in time, because the topmost Component changes often during development.
- `component-name.test.ts` are created for writing tests.

The `components` folder can also host its own `utilities` and `components`.

### Using [Material-UI](https://github.com/mui-org/material-ui)

To alter Material-UI components we use [styled-components](https://github.com/styled-components/styled-components), read [here](https://material-ui.com/guides/interoperability/#styled-components) on how it works.


## Generate TypeScript from Open API spec

### Requirement
- [openapi-generator](https://openapi-generator.tech) (Provided as devdep in `package.json`)

Run this script in root project

`yarn openapi-generator generate -i https://petstore.swagger.io/v2/swagger.json -g typescript-fetch -o ./src/api`

## Manifest

Uses generated manifest from [RealFaviconGenerator](https://realfavicongenerator.net/) [v0.16](https://realfavicongenerator.net/change_log#v0.16)