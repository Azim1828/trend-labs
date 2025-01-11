'use client'

import { Suspense } from 'react'
import { CheckCircle } from 'lucide-react'
import { SuccessContent } from '@/components/checkout/success-content'

export default function SuccessPage() {
  return (
    <main className="container mx-auto py-10">
      <div className="mx-auto max-w-md text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <Suspense fallback={<div>Loading...</div>}>
          <SuccessContent />
        </Suspense>
      </div>
    </main>
  )
} 