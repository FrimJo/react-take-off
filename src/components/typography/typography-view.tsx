import * as React from 'react'
import tw from 'twin.macro'

export const variant = {
  H1: 'h1' as const,
  H2: 'h2' as const,
  H3: 'h3' as const,
  H4: 'h4' as const,
  H5: 'h5' as const,
  H6: 'h6' as const,
  Subtitle1: 'subtitle1' as const,
  Subtitle2: 'subtitle2' as const,
  Body1: 'body1' as const,
  Body2: 'body2' as const,
  Button: 'button' as const,
  Caption: 'caption' as const,
  Overline: 'overline' as const,
}
type ValueOf<T> = T[keyof T]
export type VariantType = ValueOf<typeof variant>

const typographyVariants = {
  [variant.H1]: tw.h1`text-8xl tracking-tighter font-thin normal-case text-primary font-display`,
  [variant.H2]: tw.h2`text-7xl tracking-tight font-thin normal-case text-primary font-display`,
  [variant.H3]: tw.h3`text-5xl tracking-normal font-light normal-case text-primary font-display`,
  [variant.H4]: tw.h4`text-4xl tracking-tight font-light normal-case text-primary font-display`,
  [variant.H5]: tw.h5`text-2xl tracking-normal font-light normal-case text-primary font-display`,
  [variant.H6]: tw.h6`text-xl tracking-normal font-normal normal-case text-primary font-display`,
  [variant.Subtitle1]: tw.h6`text-base tracking-wider font-semibold normal-case text-primary font-display`,
  [variant.Subtitle2]: tw.h6`text-sm tracking-normal font-semibold normal-case text-primary font-display`,
  [variant.Body1]: tw.p`text-base tracking-wide font-normal normal-case text-primary font-body`,
  [variant.Body2]: tw.p`text-sm tracking-wide font-normal normal-case text-primary font-body`,
  [variant.Button]: tw.span`text-sm tracking-widest font-normal uppercase text-primary font-body`,
  [variant.Caption]: tw.span`text-xs tracking-wide font-light normal-case text-primary font-body`,
  [variant.Overline]: tw.span`text-xs tracking-widest font-light uppercase text-primary font-body`,
}

export type TypographyProps = { variant: VariantType }

const TypographyView: React.FC<TypographyProps> = (props) => {
  const { variant, ...rest } = props
  const Component = typographyVariants[variant]
  return <Component {...rest} />
}

export default TypographyView
