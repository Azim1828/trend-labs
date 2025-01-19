import { Mail, MapPin, Phone, User } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Get in Touch</h2>
      <p className="text-muted-foreground">
        We&apos;re here to help and answer any question you might have. We look
        forward to hearing from you.
      </p>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-[#FF6B6B]" />
          <span>daeed5@outlook.com</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-[#FF6B6B]" />
          <span>+86 16235797392</span>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-[#FF6B6B]" />
          <span>
            DongKouXianShiJiangZhen, BoBingCunShiQiaoZu4Hao, HuNanSheng, 422300,
            China
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-[#FF6B6B]" />
          <span>WeiZhi Tan</span>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
        <p className="text-muted-foreground">Monday - Friday: 9am to 5pm</p>
        <p className="text-muted-foreground">Saturday: 10am to 3pm</p>
        <p className="text-muted-foreground">Sunday: Closed</p>
      </div>
    </div>
  );
}
