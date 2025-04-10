"use client";

import { Card } from "@/components/ui/card";
import {
  ArrowUp,
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteFooter() {
  const [showScroll, setShowScroll] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Enhanced mobile accordion functionality
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  return (
    <footer className="bg-gradient-to-b from-[#FFE4E0] to-[#FFD4D0] text-gray-800">
      {/* Newsletter Section */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto py-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600">
              Get the latest updates on new products and upcoming sales
            </p>
            <div className="flex w-full max-w-md flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6B6B] focus:outline-none"
              />
              <button className="rounded-lg bg-[#FF6B6B] px-6 py-2 text-white transition-colors hover:bg-[#FF5252]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Contact Information */}

          <Card className="p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">Get In Touch With Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#FF6B6B]" />
                <p>+86 17081679328</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#FF6B6B]" />
                <div className="font-medium text-sm space-y-1">
                  <p>
                    No. 10, Xintang Road, Chengfeng Village, Licheng Street,
                    Zengcheng District, Guangzhou City, Guangdong Province,
                    510000, China
                  </p>
                  <p className="text-gray-600">
                    广州市增城区荔城街道城丰村新汤路10号, 广州市, 广东省, 510000
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#FF6B6B]" />
                <p>f4903a@outlook.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-[#FF6B6B]" />
                <p>
                  Contact Person: <span>liu hao (昊 刘)</span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-[#FF6B6B]" />
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
              <div className="pt-6 space-y-2">
                <h3 className="text-lg font-semibold">Business Name</h3>
                <p className="text-muted-foreground">广州腻泺商贸有限公司</p>
                <p className="text-muted-foreground">
                  GUANG ZHOU NI LUO SHANG MAO YOU XIAN GONG SI
                </p>
                <p className="text-muted-foreground font-medium">
                  Registration Number: 91440118MADETC899H
                </p>
              </div>
            </div>
          </Card>
          {/* Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Information</h3>
              <button
                className="block lg:hidden"
                onClick={() => toggleSection("information")}
              >
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform ${
                    activeSection === "information" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <ul
              className={`space-y-3 text-sm ${
                activeSection === "information" || "lg:block"
                  ? "block"
                  : "hidden"
              }`}
            >
              {[
                "About Us",
                "Contact Us",
                "Downloads",
                "Sitemap",
                "FAQs Page",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="group flex items-center space-x-2 transition-colors hover:text-[#FF6B6B]"
                  >
                    <span className="h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:bg-[#FF6B6B] group-hover:w-2"></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Shop Departments */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Shop Departments</h3>
              <button
                className="block lg:hidden"
                onClick={() => toggleSection("departments")}
              >
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform ${
                    activeSection === "departments" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <ul
              className={`space-y-3 text-sm ${
                activeSection === "departments" || "lg:block"
                  ? "block"
                  : "hidden"
              }`}
            >
              {[
                "Computers & Accessories",
                "Smartphones & Tablets",
                "TV, Video & Audio",
                "Cameras, Photo & Video",
                "Headphones",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="group flex items-center space-x-2 transition-colors hover:text-[#FF6B6B]"
                  >
                    <span className="h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:bg-[#FF6B6B] group-hover:w-2"></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Working Hours & Support */}
          <Card className="p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">
              Customer Support Hours
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
              <div className="mt-4 rounded-lg bg-[#FF6B6B] p-4 text-white">
                <p className="font-medium">Need Help?</p>
                <p className="mt-2 text-sm">
                  Our customer service team is here to help you with any
                  questions or concerns.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white bg-opacity-50">
        <div className="container mx-auto py-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-sm">We Accept:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Visa",
                  "Mastercard",
                  "American Express",
                  "PayPal",
                  "Diners Club",
                ].map((card) => (
                  <div
                    key={card}
                    className="flex h-8 w-12 items-center justify-center rounded-md bg-white shadow-sm transition-transform hover:scale-105"
                    title={card}
                  >
                    <div className="h-4 w-8 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Follow Us:</span>
              <div className="flex space-x-2">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Instagram, href: "#" },
                ].map(({ Icon, href }) => (
                  <Link
                    key={Icon.name}
                    href={href}
                    className="group rounded-full bg-[#FF6B6B] p-2 transition-all hover:bg-[#FF5252] hover:shadow-lg"
                  >
                    <Icon className="h-4 w-4 text-white transition-transform group-hover:scale-110" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-800 py-4 text-center text-sm text-white">
        <div className="container mx-auto">
          <p>
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 rounded-full bg-[#FF6B6B] p-3 text-white shadow-lg transition-all hover:bg-[#FF5252] hover:shadow-xl ${
          showScroll ? "opacity-100" : "opacity-0"
        }`}
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </footer>
  );
}

export default SiteFooter;
