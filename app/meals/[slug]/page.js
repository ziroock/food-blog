import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getMeal } from '@/api/meals'
import classes from './page.module.css'

export default function MealsDetailsPage({ params: { slug } }) {
  const meal = getMeal(slug)

  if (!meal) {
    // Calling this function will stop the page from rendering and
    // will show the closes not found or error page
    notFound()
  }

  // Look for all line breaks '\n' and replace them with a <br> tag
  meal.instructions = meal.instructions.replace(/\n/g, '<br>')
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          // You openyourself up to XSS attacks when using dangerouslySetInnerHTML
          // unless you're 100% sure the content is safe
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  )
}
