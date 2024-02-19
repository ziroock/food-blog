import Link from 'next/link'
import Image from 'next/image'
import HeaderBackground from '@/components/Header/HeaderBackground'

import logoImg from '@/assets/logo.png'
// import style from './Header.module.css' to affect the style of the header only and not the whole page
// This import wayy does not affect global styles
import classes from './Header.module.css'

export default function Header() {
  return (
    <>
      <HeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
