import tw from 'twin.macro'
import { Typography } from 'components'

type ContaiendButtonProps = {
  variant: 'primary' | 'secondary' | 'success' | 'error'
  loading?: boolean
} & Omit<React.HTMLProps<HTMLButtonElement>, 'type'>

const colorStyleMap = {
  primary: tw`bg-primary hover:bg-primary-dark focus:ring-primary focus:ring-offset-primary-light text-primary-contrast`,
  secondary: tw`bg-secondary hover:bg-secondary-dark focus:ring-secondary focus:ring-offset-secondary-light text-secondary-contrast`,
  success: tw`bg-success hover:bg-success-dark focus:ring-success focus:ring-offset-success-light text-success-contrast`,
  error: tw`bg-error hover:bg-error-dark focus:ring-error focus:ring-offset-error-light text-error-contrast`,
}

const ContaiendButtonView: React.FC<ContaiendButtonProps> = (props) => {
  const { children, variant, loading = false, disabled, ...rest } = props
  const isDisabled = loading || disabled
  return (
    <button
      type="button"
      css={[
        colorStyleMap[variant],
        isDisabled && tw`cursor-not-allowed`,
        tw`py-2 px-4 flex justify-center items-center transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg `,
      ]}
      disabled={isDisabled}
      {...rest}>
      {loading && (
        <svg
          width="20"
          height="20"
          fill="currentColor"
          tw="mr-2 animate-spin"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
        </svg>
      )}
      {<Typography variant="button">{children}</Typography>}
    </button>
  )
}

export default ContaiendButtonView
