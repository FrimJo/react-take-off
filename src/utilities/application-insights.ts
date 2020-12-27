import { DiagnosticLogger, _InternalLogMessage } from '@microsoft/applicationinsights-core-js'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

let appInsights: ApplicationInsights | undefined = undefined

export function startAppInsights() {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Not in production, skip loading application insights')
    return
  }
  const instrumentationKey = process.env.NEXT_PUBLIC_APP_INSIGHTS_INSTRUMENTATION_KEY
  if (!process.env.NEXT_PUBLIC_APP_INSIGHTS_INSTRUMENTATION_KEY) {
    console.warn(
      'Could not load application insight, missing environmentvariable NEXT_PUBLIC_APP_INSIGHTS_KEY'
    )
    return
  }

  // We have key and is in prod, start application insight
  try {
    appInsights = new ApplicationInsights({ config: { instrumentationKey } })
    const logger = new DiagnosticLogger({
      loggingLevelConsole: 2,
      enableDebugExceptions: true,
    })
    appInsights.loadAppInsights(false, logger)
    console.warn('Application insight loaded')
  } catch (error) {
    console.warn('Could not load application insight')
    if (error instanceof _InternalLogMessage) {
      console.warn(error.message)
      return
    }
    console.warn(error)
  }
}

export function trackException(errorMessage: string) {
  appInsights?.trackException({ exception: new Error(errorMessage) })
}
