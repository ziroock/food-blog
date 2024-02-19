import Link from 'next/link'

import MealsGrid from '@/components/Meals/MealsGrid'

import classes from './page.module.css'

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, create <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recepie and cook it yourself. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={[]} />
      </main>
    </>
  )
}
