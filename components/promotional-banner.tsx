import Image from "next/image"
import { Button } from "@/components/ui/button"
import { mostPopular } from "@/data/data"



export function PromotionalBanner() {
  return (
    <section className="container mx-auto py-16">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Banner Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <Image
              src="/banner.jpg"
              alt="Trendy fashion model wearing striped sweater"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <h2 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Trendy
              <br />
              Quality product
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Discover our collection of trendy and high-quality fashion items
            </p>
            <Button 
              className="w-fit bg-[#FF6B6B] hover:bg-[#FF5252]"
              size="lg"
            >
              SHOP NOW
            </Button>
          </div>
        </div>

        {/* Attached Products */}
        <div className="border-t bg-white/80 backdrop-blur-sm">
          <div className="flex overflow-x-auto p-6 scrollbar-hide">
            <div className="flex gap-6">
              {mostPopular.map((product) => (
                <div 
                  key={product.id}
                  className="flex min-w-[200px] items-center gap-4"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="text-sm font-semibold text-[#FF6B6B]">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

