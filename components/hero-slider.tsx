"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Slide {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: "/slideshow1-1.jpg",
    title: "70% off to everything",
    description: "Winter Collection Sale",
  },
  {
    image: "/slideshow1-2.jpg",
    title: "50% off on accessories",
    description: "Exclusive Accessories Sale",
  },
  {
    image: "/slideshow1-3.jpg",
    title: "30% off on new arrivals",
    description: "Latest Trends Discount",
  },
];


export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance slides
  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="relative h-[89vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image}
          alt="Background"
          fill
          className="object-cover transition-opacity duration-500 ease-in-out"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="z-10 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm  transition-all hover:bg-red-600"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
          <span className="sr-only">Previous slide</span>
        </Button>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-end px-8 md:px-16">
          <div className="max-w-xl text-right">
            <p className="text-lg font-medium text-white/80 mb-4 animate-fadeIn">
              {slides[currentSlide].description}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-white lg:text-7xl mb-8 animate-slideUp">
              {slides[currentSlide].title}
            </h1>
            <Button
              size="lg"
              className="border-2 border-red-600 hover:bg-white hover:text-red-600 bg-red-600 text-white transition-all duration-300 animate-fadeIn"
            >
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="z-10 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-red-600 transition-all"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6 text-white" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
