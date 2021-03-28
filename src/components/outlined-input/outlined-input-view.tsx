/* eslint-disable react/display-name */
import * as React from 'react'
import tw, { TwStyle } from 'twin.macro'
import { ExclamationCircleSmallIcon } from 'assets/icons'

type Variant = 'primary' | 'secondary' | 'success' | 'error'

type OutlinedInputProps = {
  variant?: Variant
  label?: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const colorStyleMap: { [variant in Variant]: TwStyle } = {
  primary: tw`focus:ring-primary focus:border-primary`,
  secondary: tw`focus:ring-secondary focus:border-secondary`,
  success: tw`focus:ring-success focus:border-success`,
  error: tw`focus:ring-error focus:border-error`,
}

const OutlinedInputView = React.forwardRef<HTMLInputElement, OutlinedInputProps>((props, ref) => {
  const { variant = 'primary', error, label, className, id = props.name, ...htmlAttributes } = props
  return (
    <div>
      {label ? (
        <label htmlFor={id} tw="block text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : null}
      <div className={className} tw="relative">
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? 'true' : 'false'}
          css={[
            tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`,
            colorStyleMap[variant],
            error &&
              tw`border-error-light text-error-dark placeholder-error-light focus:ring-error focus:border-error`,
          ]}
          {...htmlAttributes}
        />
        <div tw="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {error && <ExclamationCircleSmallIcon tw="h-5 w-5 text-error" />}
        </div>
      </div>
      {error && (
        <p tw="mt-2 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

export default OutlinedInputView
