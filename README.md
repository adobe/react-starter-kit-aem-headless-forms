# Getting Started with AEM Headless Forms App Starter

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This application is built to consume the form model definition of an adaptive form.

## System Requirements

* Latest release of GIT

* Node.js 16.13.0 or later

## Available Scripts

In the project directory, you can run:

### `npm install`

Install dependencies.

### `npm start`

Runs the app in development mode by proxying the JSON model from an existing API or local filesystem.

After running npm start, your app will be automatically opened in your browser (at path http://localhost:3000). If you make edits, the page will reload.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build:prod`

Builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Using external api to fetch form model json

By default, this project is configured to pick the form model json from ../form-definitions/form-model.json. For scenarios where the model needs to be served from an external API, we will need to update the below environment variables in [.env](./.env) file.
* `USE_LOCAL_JSON` : Set this to 'false'
* `FORM_API` : Set the value to the HTTP endpoint.

## Mappings Object

A Mappings Object is a JavaScript map that maps the field types defined in the Specification to its respective React Component. The Adaptive Form Super Component uses this map to render the different components defined in the Form JSON.

To use that in your project use the following import, assuming you have added the project as a dependency in your project

```
import {mappings} from '@aemforms/af-react-vanilla-components'
```

Once you have fetched the JSON for the form, the code would look like

```
import {mappings} from '@aemforms/af-react-vanilla-components'
const json = {...}
<AdaptiveForm mappings={mappings} formJson={json} />
```

If you are not using React Spectrum then you might need to start your app with the React Spectrum Provider.

If you are not using Provider at your app level, you can use that with the Adaptive Form Super Component

```
import {mappings} from '@aemforms/af-react-vanilla-components'
const json = {...}
<AdaptiveForm mappings={mappings} formJson={json} />

```
The React Starter Kit uses the Canvas theme by default; to use other themes like WKND or Easel, please follow the provided steps to configure WKND theme: 
1) Install the theme using npm install --save @aemforms/af-wknd-theme.
2) After installing it, import it in form.tsx using import '@aemforms/af-wknd-theme/dist/theme.css'.

For reference, check the steps to configure WKND theme(`https://github.com/adobe/react-starter-kit-aem-headless-forms/pull/22`)

# Links
1. [Story book](https://opensource.adobe.com/aem-forms-af-runtime/storybook)
2. [HTTP API Docs](https://opensource.adobe.com/aem-forms-af-runtime/api)
3. [Adaptive Form Runtime packages](https://www.npmjs.com/org/aemforms)

