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
          <span>marciairving63@hotmail.com</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-[#FF6B6B]" />
          <span>+1 2089278558</span>
        </div>
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-[#FF6B6B] mt-1" />
          <div className="flex flex-col text-sm">
            <span>
              No. 10, Xintang Road, Chengfeng Village, Licheng Street, Zengcheng
              District, Guangzhou, Guangdong, 510000
            </span>
            <span className="text-gray-600">
              广州市增城区荔城街道城丰村新汤路10号, 广州市, 广东省, 510000
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-[#FF6B6B]" />
          <span>liu hao (昊 刘)</span>
        </div>
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

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
        <p className="text-muted-foreground">Monday - Friday: 9am to 5pm</p>
        <p className="text-muted-foreground">Saturday: 10am to 3pm</p>
        <p className="text-muted-foreground">Sunday: Closed</p>
      </div>
    </div>
  );
}
