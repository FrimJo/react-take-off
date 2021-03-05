import * as React from 'react'
import * as nextImage from 'next/image'
import ThemeProvider from '../src/contexts/theme-provider/theme-provider-container'
import LocalStorageProvider from '../src/contexts/local-storage/local-storage-context'
import { GoogleFonts } from 'next-google-fonts'

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      mobile: {
        name: 'iPhone X',
        styles: {
          width: '375px',
          height: '812px',
        },
      },
      tablet: {
        name: 'iPad',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      laptop: {
        name: 'Laptop',
        styles: {
          width: '1024px',
          height: '768px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1440px',
          height: '1024px',
        },
      },
    },
  },
}

// Global decorator to apply the styles to all stories
export const decorators = [
  (Story) => (
    <React.Fragment>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Poppins:wght@100;300;400;500&display=swap" />
      <LocalStorageProvider>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </LocalStorageProvider>
    </React.Fragment>
  ),
]

// Replace next/image for Storybook
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    const { width, height } = props
    const ratio = (height / width) * 100
    return (
      <div
        style={{
          paddingBottom: `${ratio}%`,
          position: 'relative',
        }}>
        <img
          style={{
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          {...props}
        />
      </div>
    )
  },
})
