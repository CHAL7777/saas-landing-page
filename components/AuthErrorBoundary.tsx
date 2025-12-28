'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthErrorBoundaryProps {
  children: React.ReactNode
}

export default function AuthErrorBoundary({ children }: AuthErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason
      
      // Check for Clerk-related errors
      if (error?.message?.includes('Clerk') || 
          error?.message?.includes('NEXT_REDIRECT') ||
          error?.message?.includes('infinite redirect')) {
        
        console.warn('Clerk Authentication Error:', error)
        setErrorMessage('Authentication error detected. Redirecting to sign-in...')
        setHasError(true)
        
        // Redirect to sign-in after a delay
        setTimeout(() => {
          router.push('/sign-in')
        }, 2000)
        
        event.preventDefault()
      }
    }

    const handleError = (error: ErrorEvent) => {
      const errorMsg = error.message
      
      if (errorMsg?.includes('Clerk') || 
          errorMsg?.includes('NEXT_REDIRECT') ||
          errorMsg?.includes('infinite redirect')) {
        
        console.warn('Clerk Authentication Error:', error)
        setErrorMessage('Authentication error detected. Redirecting to sign-in...')
        setHasError(true)
        
        // Redirect to sign-in after a delay
        setTimeout(() => {
          router.push('/sign-in')
        }, 2000)
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [router])

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            Authentication Issue Detected
          </h2>
          <p className="text-slate-400 mb-4">
            {errorMessage || 'An authentication error occurred. Redirecting...'}
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-400"></div>
            <span className="text-sm text-slate-500">Redirecting to sign-in...</span>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
