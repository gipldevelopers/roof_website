import { Inter, Space_Grotesk } from 'next/font/google'
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata = {
  title: 'MaxRoof | Modern Construction & Roofing Solutions',
  description: 'Leading provider of premium metal roofing, pre-engineered buildings, and industrial construction solutions. Quality, durability, and innovation.',
  openGraph: {
    title: 'MaxRoof | Modern Construction & Roofing Solutions',
    description: 'Leading provider of premium metal roofing, pre-engineered buildings, and industrial construction solutions. Quality, durability, and innovation.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <Providers>
          <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
