import Header from '@/components/Header/Header'

import './globals.css'

// icon.png is a reserved filed name for the favicon
// it should be placed in the app folder and it will
// be automatically picked up by NextJS

// Reserved variable name to define the metadata of the layout
// which is usally defined in the head tag of the HTML
export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
