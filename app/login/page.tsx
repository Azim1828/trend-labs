'use client'

import { Suspense } from 'react'
import { LoginContent } from '@/components/login/login-content'

export default function LoginPage() {
  return (
    <main className="container mx-auto py-10">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-3xl font-bold">Login</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginContent />
        </Suspense>
      </div>
    </main>
  )
} 