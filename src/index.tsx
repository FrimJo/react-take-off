import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import { AI_INSTRUMENTATION_KEY, GA_TRACKING_ID } from 'config/variables'
import 'core-js'
import React from 'react'
import 'react-app-polyfill/ie11'
import ReactDOM from 'react-dom'
import { App } from './components/app'
import * as serviceWorker from './service-worker'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
} else if (process.env.NODE_ENV === 'production') {
  // Google Analytics
  // Add variable REACT_APP_GA_TRACKING_ID to DevOps build pipeline for cloud environments
  if (GA_TRACKING_ID) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ReactGA = require('react-ga')
    ReactGA.initialize(GA_TRACKING_ID)
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  // Application Insights
  // Add variable REACT_APP_AI_INSTRUMENTATION_KEY to DevOps build pipeline for cloud environments
  if (AI_INSTRUMENTATION_KEY) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ApplicationInsights = require('@microsoft/applicationinsights-web')
    const appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: AI_INSTRUMENTATION_KEY,
      },
    })
    appInsights.loadAppInsights()
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
