import { Suspense } from 'react'
import Link from 'next/link'

import MealsGrid from '@/components/Meals/MealsGrid'
import { getMeals } from '@/api/meals'

import classes from './page.module.css'

async function Meals() {
  const meals = await getMeals()

  return <MealsGrid meals={meals} />
}

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
        <Suspense fallback={<p className={classes.loading}>Loading meals... </p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}
