"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface Slide {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: "/slider.webp",
    title: "70% off to everything",
    description: "Winter Collection Sale",
  },
  {
    image: "/slider_01.webp",
    title: "50% off on accessories",
    description: "Exclusive Accessories Sale",
  },
  {
    image: "/slider_02.webp",
    title: "30% off on new arrivals",
    description: "Latest Trends Discount",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating]);

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      aria-live="polite"
    >
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-700">
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Slide Content */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-${
          currentSlide === 1 ? "end" : "start"
        } px-6 md:px-16`}
      >
        <div
          className={`max-w-lg text-${currentSlide === 1 ? "right" : "left"}`}
        >
          <p className="text-lg text-white/80 mb-2 animate-fadeIn">
            {slides[currentSlide].description}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slideUp">
            {slides[currentSlide].title}
          </h1>
          <Link href="/shop" passHref>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-white text-white hover:text-red-600 transition-all duration-300 border border-red-600"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Previous slide"
          className="h-12 w-12 bg-white/20 text-white rounded-full backdrop-blur-md hover:bg-red-600"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Next slide"
          className="h-12 w-12 bg-white/20 text-white rounded-full backdrop-blur-md hover:bg-red-600"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
