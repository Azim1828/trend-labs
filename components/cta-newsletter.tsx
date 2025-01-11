'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function CTANewsletter() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const form = event.target as HTMLFormElement
      const email = form.email.value

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      toast({
        title: "Success!",
        description: "You have been subscribed to our newsletter.",
      })
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to subscribe",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-[#FFE4E0] py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stay Updated
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Subscribe to our newsletter to receive updates, news, and exclusive offers.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                className="flex-1"
                name="email"
                placeholder="Enter your email"
                type="email"
                required
              />
              <Button 
                type="submit"
                className="bg-[#FF6B6B] hover:bg-[#FF5252]"
                disabled={isLoading}
              >
                {isLoading ? "..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

