import * as React from 'react'
import Link from 'next/link'
import Test from '../pages/test'

const Header = ({ pathname }) => (
  <header>
    {/* <Link href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Hello</a>
    </Link>{' '} */}
    {/* <Link href="/about">
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>{' '} */}
    <Link href="/test">
      <a className={pathname === '/test' ? 'is-active' : ''}>Test</a>
    </Link>
  </header>
)

export default Header
