import sql from 'better-sqlite3'

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
