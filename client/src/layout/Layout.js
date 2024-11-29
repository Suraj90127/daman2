import React from 'react'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <>
      {children}
      <Navbar/>
    </>
  )
}

export default Layout
