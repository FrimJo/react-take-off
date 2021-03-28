// Implemented from https://tailwindui.com/components/application-ui/application-shells/stacked#component-10058606cac5398d7fa2c73b64089874

import 'twin.macro'
import * as React from 'react'
import { PageWrapper, Navbar } from 'components'

type ApplicationShellProps = { title: string }

const ApplicationShellView = ({
  children,
  title,
}: React.PropsWithChildren<ApplicationShellProps>) => {
  return (
    <React.Fragment>
      <PageWrapper.Top>
        <Navbar
          links={[
            { title: 'Dashboard', href: '/' },
            { title: 'Team', href: '/team' },
            { title: 'Projects', href: '/projects' },
            { title: 'Calendar', href: '/calendar' },
            { title: 'Reports', href: '/reports' },
          ]}
        />
        <header tw="bg-white shadow-sm">
          <div tw="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 tw="text-lg leading-6 font-semibold text-gray-900">{title}</h1>
          </div>
        </header>
      </PageWrapper.Top>
      <PageWrapper.Body as="main" tw="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </PageWrapper.Body>
    </React.Fragment>
  )
}

export default ApplicationShellView
