'use server'
import { redirect } from 'next/navigation'
import { saveMeal } from '@/api/meals'

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

  await saveMeal(meal)

  redirect('/meals')
}
