import fs from 'node:fs'

import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

const db = sql('meals.db')

export async function getMeals() {
  // Adding this to imitate asynchronus behavior
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Use all to fetch all the rows that are fetched by this statment(query)
  return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug) {
  // Do not use this, it is vulnerable to SQL injection
  // return db.prepare('SELECT * FROM meals WHERE slug = ' + slug).get()

  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal) {
  // Add a slug based on the title of the meal and make it lowercase
  meal.slug = slugify(meal.title, { lower: true })
  // Sanitize the input to prevent XSS attacks
  meal.instructions = xss(meal.instructions)
  const extension = meal.image.name.split('.').pop()
  // Generate random string containing numbers and letters only that is 5 characters long
  const randomString = Math.random().toString(36).substring(2, 7)
  const fileName = `${meal.slug}-${randomString}.${extension}`

  const stream = fs.createWriteStream(`public/images/${fileName}`)

  const bufferedImage = await meal.image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!')
    }
  })

  // All requests will be sent to public folder by default so we shouldn't include public in the path
  meal.image = `/images/${fileName}`

  // Save in the database
  // Do not dierctly insert the data into the query, it is vulnerable to SQL injection
  //  (${}, ${}, ${}, ${}, ${}, ${}, ${})
  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
    `,
  ).run(meal)
}
