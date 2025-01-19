import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function FashionHero() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Image */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
            <Image
              src="/promo-1.webp"
              alt="Fashion model in coral blazer"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center lg:col-span-3">
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            Fit For All, All Around The Globe.
          </h1>
          <p className="mb-8 text-muted-foreground">
            In cursus turpis massa tincidunt dui ut ornare lectus. Venenatis
            lectus magna fringilla urna porttitor rhoncus. Porta lorem mollis
            aliquam ut porttitor leo a. Sit amet facilisis magna etiam tempor
            orci. Id velit ut tortor pretium viverra suspendisse potenti nullam.
            Sagittis orci a scelerisque purus. Vel turpis nunc eget.
          </p>
          <Link href="/shop">
            <Button className="w-fit bg-black text-white hover:bg-black/90">
              Shop Now
            </Button>
          </Link>
        </div>

        {/* Right Side Images */}
        <div className="space-y-8 lg:col-span-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/promo-2.webp"
              alt="Model in beige coat"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/promo-3.webp"
              alt="Model in gray plaid coat"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
