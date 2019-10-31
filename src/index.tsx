import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { AI_INSTRUMENTATION_KEY, GA_TRACKING_ID } from 'config/variables'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { App } from './components/app'
import * as serviceWorker from './service-worker'

// Google Analytics
// Add variable REACT_APP_GA_TRACKING_ID to DevOps build pipeline for cloud environments
if (GA_TRACKING_ID) {
  ReactGA.initialize(GA_TRACKING_ID)
  ReactGA.pageview(window.location.pathname + window.location.search)
}

// Application Insights
// Add variable REACT_APP_AI_INSTRUMENTATION_KEY to DevOps build pipeline for cloud environments
if (AI_INSTRUMENTATION_KEY) {
  const appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: AI_INSTRUMENTATION_KEY,
    },
  })
  appInsights.loadAppInsights()
}

ReactDOM.render(<App />, document.getElementById('app'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
