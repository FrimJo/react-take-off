import { styled, theme } from 'twin.macro'

const typographyVariants = {
  h1: styled.h1`
    font-size: 6rem;
    letter-spacing: -1.5;
    font-weight: 100;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.25;
  `,
  h2: styled.h2`
    font-size: 4.175rem;
    letter-spacing: -0.5;
    font-weight: 100;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.25;
  `,
  h3: styled.h3`
    font-size: 3rem;
    letter-spacing: 0;
    font-weight: 300;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.25;
  `,
  h4: styled.h4`
    font-size: 2.125rem;
    letter-spacing: 0.25;
    font-weight: 300;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.5;
  `,
  h5: styled.h5`
    font-size: 1.5rem;
    letter-spacing: 0;
    font-weight: 300;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.5;
  `,
  h6: styled.h6`
    font-size: 1.25rem;
    letter-spacing: 0.15;
    font-weight: 400;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.5;
  `,
  subtitle1: styled.span`
    font-size: 1rem;
    letter-spacing: 0.15;
    font-weight: 500;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.5;
  `,
  subtitle2: styled.span`
    font-size: 0.875rem;
    letter-spacing: 0.1;
    font-weight: 500;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.5;
  `,
  body1: styled.span`
    font-size: 1rem;
    letter-spacing: 0.5;
    font-weight: 300;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.5;
  `,
  body2: styled.span`
    font-size: 0.875rem;
    letter-spacing: 0.25;
    font-weight: 300;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.5;
  `,
  button: styled.span`
    font-size: 0.875rem;
    letter-spacing: 1.25;
    font-weight: 400;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.5;
  `,
  caption: styled.span`
    font-size: 0.75rem;
    letter-spacing: 0.4;
    font-weight: 300;
    text-transform: none;
    color: ${theme`textColor.primary`};
    line-height: 1.5;
  `,
  overline: styled.span`
    font-size: 0.625rem;
    letter-spacing: 1.5;
    font-weight: 300;
    text-transform: uppercase;
    color: ${theme`textColor.primary`};
    line-height: 1.5;
  `,
}

type Variant = keyof typeof typographyVariants

type TypographyProps = { variant: Variant }

const TypographyProps: React.FC<{ variant: Variant }> = (props) => {
  const { variant, children } = props
  const TypographyComponent = typographyVariants[variant]
  return <TypographyComponent>{children}</TypographyComponent>
}

export default TypographyProps
