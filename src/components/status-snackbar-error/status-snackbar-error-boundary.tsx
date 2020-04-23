/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { StatusSnackbarErrorView } from './status-snackbar-error-view'

type State = Readonly<
  | {
      hasError: false
    }
  | {
      hasError: true
      error: any
    }
>

/**
 * Error boundaries are React components that catch JavaScript errors
 * anywhere in their child component tree, log those errors, and display
 * a fallback UI instead of the component tree that crashed. Error boundaries
 * catch errors during rendering, in life cycle methods, and in constructors
 * of the whole tree below them.
 *
 * Error boundaries do not catch errors for:
 * - Event handlers
 * - Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
 * - Server side rendering
 * - Errors thrown in the error boundary itself (rather than its children)
 */
export class StatusSnackbarErrorBoundary extends React.Component<{}, State> {
  public readonly state: State = { hasError: false }

  public static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  public componentDidCatch(error: any, errorInfo: any) {
    // tslint:disable-next-line: no-console
    console.error('Error boundary caught error', error, errorInfo)
  }

  private handleToggle() {
    this.setState(() => ({ hasError: false }))
  }

  public render() {
    if (this.state.hasError) {
      const message =
        this.state.error instanceof Error
          ? this.state.error.message
          : 'Unknown error occurred, see console for details'
      return <StatusSnackbarErrorView open={true} message={message} onClose={this.handleToggle} />
    }

    return this.props.children
  }
}
