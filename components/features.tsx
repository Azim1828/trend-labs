import { Truck, RefreshCcw, Clock, CreditCard } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders over $50"
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30 days free return policy"
  },
  {
    icon: Clock,
    title: "Support 24/7",
    description: "Contact us 24 hours a day"
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "100% secure payment methods"
  }
]

export function Features() {
  return (
    <section className="w-full bg-gray-50 py-16 ">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-none bg-transparent transition-all hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#FFE4E0] p-3">
                  <feature.icon className="h-6 w-6 text-[#FF6B6B]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

