// components/head.js
import { GoogleFonts } from 'next-google-fonts'
import Head from 'next/head'
import * as React from 'react'

type HeadProps = { title?: string }

const HeadView: React.FC<HeadProps> = ({ children, title }) => (
  <React.Fragment>
    {/* It's important to acknowledge that next-google-fonts is a small next/head component and should not be nested inside next/head */}
    <GoogleFonts href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Poppins:wght@100;300;400;500&display=swap" />
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
      />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content="Description" />
      <meta name="keywords" content="Keywords" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=Gv6xWBmJmL" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=Gv6xWBmJmL" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=Gv6xWBmJmL" />
      <link rel="manifest" href="/site.webmanifest?v=Gv6xWBmJmL" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg?v=Gv6xWBmJmL" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico?v=Gv6xWBmJmL" />
      <meta name="msapplication-TileColor" content="#ffc40d" />
      <meta name="theme-color" content="#ffffff" />

      <meta name="apple-mobile-web-app-title" content="Example App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <title>{title ?? 'Next.js PWA Example'}</title>
      {children}
    </Head>
  </React.Fragment>
)

export default HeadView
