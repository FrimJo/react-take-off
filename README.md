# React boilerplate with hooks

This README describes the necessary steps to get a local development environment of the web app up and running.

### TODO

- [x] Update name of `usePromise` hook to `usePromiseManager`
- [x] Update to `Formik` v2
- [x] Make usePromiseManager return array
- [x] Use only `eslint` and not `tslint`
- [x] Migrate from styled-components to Emotion
- [x] Replace `usePromiseManager` with `react-query`
- [x] Add react-query-devtools https://github.com/tannerlinsley/react-query-devtools
- [x] Add `lint-staged` and rule for `no-irregular-whitespace`
- [x] Update VSCode to run `tslint --fix` on save without pretteir bug
- [x] Rename prject to react-take-off
- [ ] Fix emotion to work with JSX and css prop
- [ ] Look into using `xstate`
- [ ] Use `xstate` for UI components souch as buttons
- [ ] Update `usePromiseManager` hook to use `React.suspense`
- [ ] Graph QL
- [ ] Remove TS check on compile
- [ ] Update Error boundery to use promise
- [ ] Update to react-router v6
- [ ] Switch to Dino over Node
- [ ] Swtich to Parcel 2 over webpack
- [ ] Implement suport for hot reloading
- [x] Implement strict mode

### Prerequisites

- A git client
  - See their [homepage](https://git-scm.com) for installation
  - If you want a gui, take a look at [Sourcetree](https://www.sourcetreeapp.com/)
- Node (their LTS version has been used, currently 10.16.0)
  - See their [homepage](https://nodejs.org) for installation
  - Run `node --version` to see wich version you've got
- Yarn (their stable version has been used, currently 1.16.0)
  - See their [homepage](https://yarnpkg.com/en) for installation
  - Run `yarn -v` to see wich version you've got
- A code editor - Visual Studio Code is recommended
- A local copy of the codebase

### Set up

Install dependencies with `yarn install`

Dublicate the file called `.env.sample` and rename it to `.env`. Then, open `.env` and remove the optional variables and set the `REACT_APP_API_URL` variable to your desired backend url.

Example for using remote backend

```
REACT_APP_API_URL=https://api-test.site.com
```

Example for using local backend (replace PPPP with port)

```
REACT_APP_API_URL=https://localhost:PORT
```

### Start

Start the application with `yarn start`

This will open http://localhost:3000 in your browser.

### Test

This project uses [jest](https://jestjs.io) for testing.
The following command will start jest in watch mode:

```
yarn test
```

This will give you an interactive cli where you can choose different alternatives like run all tests or run tests matching a given regex.

### Typecheck

Typechecking is not done during dev build, only inside VS Code and with git hooks.
If you want to start a typecheck daemon, run:

```
yarn typecheck
```

If you just want to do one typecheck:

```
yarn typecheck-once
```

### Lint

Linting is done inside VS Code but can also be run manually using:

```
yarn lint
```

To fix autofixable issues:

```
yarn lint-fix
```

## Folder structure

We use `kebab-kase` for all our files and folders in this project.

The folder structure used in this project is based of an article written by [Charles Stover](https://medium.com/@Charles_Stover) called [Optimal file structure for React applications](https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145)

- `public` is where our static files reside. (located outside of `src` folder.)
- `api` is where we keep all code for communicating with the backend. This folder should be pure TypeScript and not contain any React related code.
- `assets` is where any kind of asset, like images are place here.
- `components` contains all components of the application.
- `config` contains routes and other configurable variables.
- `localization` is where all the language files reside.
- `pages` is where we define all entry points referenced from the `routes.ts` file in `config` folder.
- `styles` contains all styling related code, souch as global styling, theme and colors.
- `types` contains special type definition files for thirdparty modules.
- `utilities` contains helper functions.

### Utilities folder `utilities`

This is a folder full of helper functions that are used globally in the project.

### Components folder `components`

The `components` folder contains all components of the application. When creating a new component use kebab-case like so: `component-name`.

Each component can, but does not need to, contain the following type files:

- `component-name-container.tsx` is your business logic and state management as handled before being sent to the stateless view Component.
- `component-name-context.tsx` is where the non local stat logic lies.
- `component-name-style.ts` is where we store the styled components.
- `component-name-view.tsx` is your stateless view Component. For the majority of cases, this Component should be able to be pure functional Component (no hooks!).
- `index.ts` is your entry point for importing your Component. It contains nothing but an import and export statement that points to the topmost Component at any point in time, because the topmost Component changes often during development.
- `component-name-test.ts` are created when writing tests.

The `components` folder can also hosts its own `utilities` for utilities and `components` for child components used by it self or it children.

### React Router

In `configs/routes.ts` we define all routes for this project, and the pages refrenced in the rotues are located in `pages`.

### Using [Material-UI](https://github.com/mui-org/material-ui)

To alter Material-UI components we use [emotion](https://github.com/emotion-js/emotion), read [here](https://material-ui.com/guides/interoperability/#emotion) on how it works.
