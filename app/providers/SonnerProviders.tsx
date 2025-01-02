'use client'

import { Toaster } from 'sonner'

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      <Toaster 
        position="bottom-right"
        expand={false}
        toastOptions={{
          className: "text-purpleBtn"
        }}
 
      />
      {children}
    </>
  )
}