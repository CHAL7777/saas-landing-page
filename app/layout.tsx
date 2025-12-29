import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from "@/components/ThemeProvider"
import { AuthProvider } from "@/contexts/AuthContext"
import ClerkProviderWrapper from "@/components/ClerkProvider"
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
  title: 'StudyMaster | AI-Powered Student Tracker',
  description: 'The ultimate workspace for students. Organize assignments, track your GPA, and use AI to simplify complex concepts—all in one place.',
  manifest: '/manifest.json',
  themeColor: '#10b981',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}>
        <ClerkProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <main className="min-h-screen">
                {children}
              </main>
            </AuthProvider>
          </ThemeProvider>
        </ClerkProviderWrapper>
      </body>
    </html>
  )
}
