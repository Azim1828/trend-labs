'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignUpForm } from "@/components/sign-up-form"
import { LoginForm } from "@/components/login-form"

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  )
}

