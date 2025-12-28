import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from "@/components/ThemeProvider"
import Navbar from "@/components/Navbar" 
import { type Metadata } from 'next'
import "../styles/globals.css"; // Fixed import path

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Scholarly | AI-Powered Student Tracker',
  description: 'Master your studies with AI-driven syllabus parsing and focus modes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* The Navbar component handles the Sign In/Sign Up buttons internally */}
            <Navbar />
            
            <main className="min-h-screen">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}