'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfo } from "@/components/personal-info"
import { OrderHistory } from "@/components/order-history"
import { Preferences } from "@/components/preferences"

export function AccountTabs() {
  const [activeTab, setActiveTab] = useState("personal-info")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
        <TabsTrigger value="order-history">Order History</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value="personal-info">
        <PersonalInfo />
      </TabsContent>
      <TabsContent value="order-history">
        <OrderHistory />
      </TabsContent>
      <TabsContent value="preferences">
        <Preferences />
      </TabsContent>
    </Tabs>
  )
}

