import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t-2 border-border/50 mt-24">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">JKKN Centenary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Celebrating 100 years of educational excellence and transformative community service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#stats" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="#activities" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Initiatives
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Komarapalayam, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@jkkn.edu.in</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Follow Us</h3>
            <p className="text-sm text-muted-foreground">
              Stay connected with our centenary celebrations and community initiatives.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} J.K.K. Nattraja Educational Institutions. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for our community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
