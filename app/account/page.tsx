import { AccountTabs } from "@/components/account-tabs";

export default function Accounts() {
    return (
        <main className="container mx-auto py-10">
        <h1 className="mb-8 text-3xl font-bold">My Account</h1>
        <AccountTabs />
      </main>
    )
}