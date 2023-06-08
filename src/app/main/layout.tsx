import React from 'react'
import DefaultLayout from '@/layout/DefaultLayout'

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <DefaultLayout>{children}</DefaultLayout>
  )
}

export default MainLayout