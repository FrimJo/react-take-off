import * as React from 'react'
import tw from 'twin.macro'

const typographyVariants = {
  h1: tw.h1`text-8xl tracking-tighter font-thin normal-case text-primary font-display`,
  h2: tw.h2`text-7xl tracking-tight font-thin normal-case text-primary font-display`,
  h3: tw.h3`text-5xl tracking-normal font-light normal-case text-primary font-display`,
  h4: tw.h4`text-4xl tracking-tight font-light normal-case text-primary font-display`,
  h5: tw.h5`text-2xl tracking-normal font-light normal-case text-primary font-display`,
  h6: tw.h6`text-xl tracking-normal font-normal normal-case text-primary font-display`,
  subtitle1: tw.h6`text-base tracking-wider font-semibold normal-case text-primary font-display`,
  subtitle2: tw.h6`text-sm tracking-normal font-semibold normal-case text-primary font-display`,
  body1: tw.p`text-base tracking-wide font-normal normal-case text-primary font-body`,
  body2: tw.p`text-sm tracking-wide font-normal normal-case text-primary font-body`,
  button: tw.span`text-sm tracking-widest font-normal uppercase text-primary font-body`,
  caption: tw.span`text-xs tracking-wide font-light normal-case text-primary font-body`,
  overline: tw.span`text-xs tracking-widest font-light uppercase text-primary font-body`,
}

type Variant = keyof typeof typographyVariants

type TypographyProps = { variant: Variant }

const TypographyView: React.FC<TypographyProps> = (props) => {
  const { variant, ...rest } = props
  const Component = typographyVariants[variant]
  return <Component {...rest} />
}

export default TypographyView
