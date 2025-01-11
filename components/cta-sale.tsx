import { Button } from "@/components/ui/button"

export function CTASale() {
  return (
    <section className="bg-[#FF6B6B] py-16 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Summer Sale
            </h2>
            <p className="max-w-[600px] text-white/90 md:text-xl/relaxed">
              Get up to 50% off on selected items. Limited time offer.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="space-y-2 text-center md:text-right">
              <p className="text-lg font-medium">Sale ends in:</p>
              <div className="flex justify-center gap-4 md:justify-end">
                {["02", "12", "45", "22"].map((num, i) => (
                  <div
                    key={i}
                    className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-white/10 backdrop-blur"
                  >
                    <span className="text-2xl font-bold">{num}</span>
                    <span className="text-xs">
                      {["Days", "Hours", "Mins", "Secs"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="mt-4 bg-white text-[#FF6B6B] hover:bg-white/90">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

