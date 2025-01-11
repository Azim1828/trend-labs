'use client'

import Link from "next/link"
import { Facebook, Twitter, Instagram, ArrowUp } from 'lucide-react'

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#FFE4E0] text-gray-800 border-t-4 border-gray-200">
      <div className="container mx-auto py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Get In Touch */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get In Touch With Us</h3>
            <div className="space-y-2 text-sm">
              <p>Phone: +86 17024746493</p>
              <div>
                <p className="font-medium">JingMenShiSheDaoQuTuan, LinZhenSuChangCunYiZu, HuBeiSheng, 448000, China</p>
               
              </div>
              
              <p>b4312d@outlook.com</p>
            </div>
          </div>

          {/* Mobile App */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Mobile App</h3>
            <div className="space-y-2">
              <button className="flex items-center justify-around w-2/3 space-x-2 rounded-md bg-[#FF6B6B] px-4 py-2 text-white transition-colors hover:bg-[#FF5252]">
                <svg width="80px" height="40px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>App Store icon</title><path d="M8.8086 14.9194l6.1107-11.0368c.0837-.1513.1682-.302.2437-.4584.0685-.142.1267-.2854.1646-.4403.0803-.3259.0588-.6656-.066-.9767-.1238-.3095-.3417-.5678-.6201-.7355a1.4175 1.4175 0 0 0-.921-.1924c-.3207.043-.6135.1935-.8443.4288-.1094.1118-.1996.2361-.2832.369-.092.1463-.175.2979-.259.4492l-.3864.6979-.3865-.6979c-.0837-.1515-.1667-.303-.2587-.4492-.0837-.1329-.1739-.2572-.2835-.369-.2305-.2353-.5233-.3857-.844-.429a1.4181 1.4181 0 0 0-.921.1926c-.2784.1677-.4964.426-.6203.7355-.1246.311-.1461.6508-.066.9767.038.155.0962.2984.1648.4403.0753.1564.1598.307.2437.4584l1.248 2.2543-4.8625 8.7825H2.0295c-.1676 0-.3351-.0007-.5026.0092-.1522.009-.3004.0284-.448.0714-.3108.0906-.5822.2798-.7783.548-.195.2665-.3006.5929-.3006.9279 0 .3352.1057.6612.3006.9277.196.2683.4675.4575.7782.548.1477.043.296.0623.4481.0715.1675.01.335.009.5026.009h13.0974c.0171-.0357.059-.1294.1-.2697.415-1.4151-.6156-2.843-2.0347-2.843zM3.113 18.5418l-.7922 1.5008c-.0818.1553-.1644.31-.2384.4705-.067.1458-.124.293-.1611.452-.0785.3346-.0576.6834.0645 1.0029.1212.3175.3346.583.607.7549.2727.172.5891.2416.9013.1975.3139-.044.6005-.1986.8263-.4402.1072-.1148.1954-.2424.2772-.3787.0902-.1503.1714-.3059.2535-.4612L6 19.4636c-.0896-.149-.9473-1.4704-2.887-.9218m20.5861-3.0056a1.4707 1.4707 0 0 0-.779-.5407c-.1476-.0425-.2961-.0616-.4483-.0705-.1678-.0099-.3352-.0091-.503-.0091H18.648l-4.3891-7.817c-.6655.7005-.9632 1.485-1.0773 2.1976-.1655 1.0333.0367 2.0934.546 3.0004l5.2741 9.3933c.084.1494.167.299.2591.4435.0837.131.1739.2537.2836.364.231.2323.5238.3809.8449.4232.3192.0424.643-.0244.9217-.1899.2784-.1653.4968-.4204.621-.7257.1246-.3072.146-.6425.0658-.9641-.0381-.1529-.0962-.2945-.165-.4346-.0753-.1543-.1598-.303-.2438-.4524l-1.216-2.1662h1.596c.1677 0 .3351.0009.5029-.009.1522-.009.3007-.028.4483-.0705a1.4707 1.4707 0 0 0 .779-.5407A1.5386 1.5386 0 0 0 24 16.452a1.539 1.539 0 0 0-.3009-.9158Z"/></svg>
                <span>Download on the App Store</span>
              </button>
              <button className="flex items-center justify-around w-2/3 space-x-2 rounded-md bg-[#FF6B6B] px-4 py-2 text-white transition-colors hover:bg-[#FF5252]">
              <svg width="80px" height="40px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><path d="M12.36,53.33V10.67a1,1,0,0,1,1.56-.91L51.11,31a1,1,0,0,1,0,1.81L13.93,54.24A1.05,1.05,0,0,1,12.36,53.33Z"/><line x1="12.36" y1="10.67" x2="42.07" y2="38.02"/><line x1="12.36" y1="53.33" x2="41.24" y2="25.35"/></svg>
                <span>Download on Google Play</span>
              </button>
            </div>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#FF6B6B]">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF6B6B]">Contact Us</Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-[#FF6B6B]">Downloads</Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-[#FF6B6B]">Sitemap</Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#FF6B6B]">FAQs Page</Link>
              </li>
            </ul>
          </div>

          {/* Shop Departments */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop Departments</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/computers" className="hover:text-[#FF6B6B]">Computers & Accessories</Link>
              </li>
              <li>
                <Link href="/smartphones" className="hover:text-[#FF6B6B]">Smartphones & Tablets</Link>
              </li>
              <li>
                <Link href="/tv-video" className="hover:text-[#FF6B6B]">TV, Video & Audio</Link>
              </li>
              <li>
                <Link href="/cameras" className="hover:text-[#FF6B6B]">Cameras, Photo & Video</Link>
              </li>
              <li>
                <Link href="/headphones" className="hover:text-[#FF6B6B]">Headphones</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-[#FFD4D0]">
        <div className="container mx-auto flex flex-col items-center justify-between py-6 md:flex-row">
          <div className="mb-4 flex items-center space-x-4 md:mb-0">
            <span className="text-sm">We Accept:</span>
            <div className="flex space-x-2">
              {['Visa', 'Mastercard', 'American Express', 'PayPal', 'Diners Club'].map((card) => (
                <div
                  key={card}
                  className="h-8 w-12 rounded bg-white p-2"
                  title={card}
                >
                  <div className="h-full w-full bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Follow Us On:</span>
            <div className="flex space-x-2">
              <Link href="#" className="rounded-full bg-[#FF6B6B] p-2 text-white hover:bg-[#FF5252]">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-full bg-[#FF6B6B] p-2 text-white hover:bg-[#FF5252]">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-full bg-[#FF6B6B] p-2 text-white hover:bg-[#FF5252]">
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 rounded-full bg-[#FF6B6B] p-3 text-white shadow-lg transition-colors hover:bg-[#FF5252]"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </footer>
  )
}

