'use client'

import { useEffect, useState, useCallback } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface Preferences {
  marketingEmails: boolean
  orderUpdates: boolean
  newProducts: boolean
}

export function Preferences() {
  const { token } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState<Preferences>({
    marketingEmails: false,
    orderUpdates: true,
    newProducts: false
  })

  const fetchPreferences = useCallback(async () => {
    try {
      const response = await fetch('/api/preferences', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch preferences')
      const data = await response.json()
      setPreferences({
        marketingEmails: data.marketingEmails,
        orderUpdates: data.orderUpdates,
        newProducts: data.newProducts
      })
    } catch (error: unknown) {
      console.error('Preferences Error:', error)
      toast({
        title: "Error",
        description: "Failed to fetch preferences",
        variant: "destructive",
      })
    }
  }, [token, toast])

  useEffect(() => {
    void fetchPreferences()
  }, [fetchPreferences])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(preferences)
      })

      if (!response.ok) throw new Error('Failed to save preferences')

      toast({
        title: "Success",
        description: "Your preferences have been saved.",
      })
    } catch (error: unknown) {
      console.error('Preferences Error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save preferences",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = (key: keyof Preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Preferences</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and notifications.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-emails">Marketing emails</Label>
            <Switch
              id="marketing-emails"
              checked={preferences.marketingEmails}
              onCheckedChange={() => handleToggle('marketingEmails')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="order-updates">Order updates</Label>
            <Switch
              id="order-updates"
              checked={preferences.orderUpdates}
              onCheckedChange={() => handleToggle('orderUpdates')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="new-products">New product alerts</Label>
            <Switch
              id="new-products"
              checked={preferences.newProducts}
              onCheckedChange={() => handleToggle('newProducts')}
            />
          </div>
        </div>
        <Button 
          type="submit"
          className="bg-[#FF6B6B] hover:bg-[#FF5252]"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </form>
    </div>
  )
}

