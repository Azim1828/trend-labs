import { CTANewsletter } from "@/components/cta-newsletter";
import { CTASale } from "@/components/cta-sale";
import { Features } from "@/components/features";
import HeroSlider from "@/components/hero-slider";
import { NewArrivals } from "@/components/new-arrivals";
import { PromotionalBanner } from "@/components/promotional-banner";
import { TabbedProducts } from "@/components/tabbed-products";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <Features />
      <CTASale />
      <NewArrivals />
      <PromotionalBanner />
      <TabbedProducts />
      <CTANewsletter />
     
    </main>
  );
}
