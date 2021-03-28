import tw, { TwStyle } from 'twin.macro'

type Variant = 'primary' | 'secondary' | 'success' | 'error'

type ContaiendButtonProps = {
  variant?: Variant
  loading?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
} & Omit<React.HTMLProps<HTMLButtonElement>, 'type'>

const colorStyleMap: { [variant in Variant]: TwStyle } = {
  primary: tw`bg-primary hover:bg-primary-dark focus:ring-primary text-primary-contrast`,
  secondary: tw`bg-secondary hover:bg-secondary-dark focus:ring-secondary text-secondary-contrast`,
  success: tw`bg-success hover:bg-success-dark focus:ring-success text-success-contrast`,
  error: tw`bg-error hover:bg-error-dark focus:ring-error text-error-contrast`,
}

const ContaiendButtonView: React.FC<ContaiendButtonProps> = (props) => {
  const {
    children,
    type = 'button',
    variant = 'primary',
    loading = false,
    disabled,
    ...rest
  } = props
  const isDisabled = loading || disabled
  return (
    <button
      type={type}
      css={[
        tw`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2`,
        isDisabled && tw`cursor-not-allowed`,
        colorStyleMap[variant],
      ]}
      disabled={isDisabled}
      {...rest}>
      {loading && (
        <svg
          tw="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            tw="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"></circle>
          <path
            tw="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
}

export default ContaiendButtonView

// <!-- This example requires Tailwind CSS v2.0+ -->
// <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//   <!-- Heroicon name: solid/mail -->
//   <svg class="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//   </svg>
//   Button text
// </button>
// <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//   <!-- Heroicon name: solid/mail -->
//   <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//   </svg>
//   Button text
// </button>
// <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//   <!-- Heroicon name: solid/mail -->
//   <svg class="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//   </svg>
//   Button text
// </button>
// <button type="button" class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//   <!-- Heroicon name: solid/mail -->
//   <svg class="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//   </svg>
//   Button text
// </button>
