# React boilerplate with hooks

This README describes the necessary steps to get a local development environment of the web app up and running.

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

### Start

Start the application with `yarn start`

This should open http://localhost:3000 in your browser.

### Test

This project uses [jest](https://jestjs.io) for testing, and the written tests are based on [test-isolation-with-react](https://kentcdodds.com/blog/test-isolation-with-react).
The following command will start jest in watch mode:

Jest Manual Mocks https://jestjs.io/docs/en/manual-mocks

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

- `public` is where our static files reside.
- `assets` is where any kind of asset, like images are place here.
- `components` contains all components of the application.
- `localization` is where all the language files reside.
- `routes` is where each entry point in to the page has its own folder.
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
- `component-name-....-test.ts` are created for each file tested.

The `components` folder also hosts its own `utilities` folder for utilities and components used by it self or it children.

A component folder can also contain their own components used only by it self.

### React Router

`routes` folder contains one folder for each entry point, like `controller` in a .NET MVC project, where each entry point folder contains a single `index.ts` file. Naming the folder is base on where they are not what they do.

Example

```
hostname.com/random-page -> src/routes/random-page/index.ts
```

### Tests

Test files are to be created in the smae foler as the files they are testing.

### Using [Material-UI](https://github.com/mui-org/material-ui)

To alter Material-UI components we use [styled-components](https://github.com/styled-components/styled-components), read [here](https://material-ui.com/guides/interoperability/#styled-components) on how it works.
