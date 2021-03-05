import { storiesOf } from '@storybook/react'
import Component, { variant } from 'components/typography/typography-view'

const stories = storiesOf('Typography', module)

for (const v of Object.values(variant)) {
  stories.add(v, () => <Component variant={v}>The five boxing wizards jump quickly</Component>)
}
