'use server'
import { redirect } from 'next/navigation'
import { saveMeal } from '@/api/meals'

function isInvalidText(text) {
  return !text || text.trim() === ''
}

// Next.js will execute this function on the server and it will
// automatically receive the formData from the form submission.
// We need a name propery for each input in the form to access
export async function shareMeal(formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }

  // Validate input, make it safer by using a library or better chekcs,
  // but jsut do a simple check here
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !isInvalidText(meal.creator_email).includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    throw new Error('Invalid input')
  }

  redirect('/meals')
}
