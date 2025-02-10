import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GradientDivider from "../../UI/divider/Divider";
import { navItems } from "../navItems";

const Footer = () => {
  return (
    <div className="w-full px-4 py-6 md:px-7 md:py-10 flex-col justify-items-center text-darkLine">
      {/* divider */}
      <GradientDivider width="w-full" fadeWidth="w-1/2" />
      
      {/* Contenu */}
      <div className="w-full flex flex-col gap-8 py-6 md:flex-row md:justify-between md:gap-20">
        {/* Logo et Contact Section */}
        <div className="w-full">
          <div className="flex flex-col items-center md:items-start md:flex-row md:gap-2">
            {/* logo */}
            <div className="mb-4 md:mb-0">
              <a
                href="https://www.linkedin.com/in/mathieu-souzani-385338241/"
                rel="noopener noreferrer"
              >
                <Image
                  src="/logoMaker/logo_supashyne.png"
                  width={150}
                  height={100}
                  alt="logo"
                  loading="lazy"
                  className="-translate-y-1"
                />
              </a>
            </div>

            {/* divider - hidden on mobile */}
            <span className="hidden md:block w-[0.1rem] h-14 mx-4 bg-textGrey/20"></span>

            {/* Content */}
            <div className="flex flex-col items-center md:items-start justify-center text-darkLine">
              <p className="font-normal text-center md:text-left">
                Made by Supashyne Agency®
              </p>

              {/* contact */}
              <div className="flex items-center gap-2 mt-4">
                <Mail size={19} className="text-darkLine" />
                <a
                  href="https://www.linkedin.com/in/mathieu-souzani-385338241/"
                  rel="noopener noreferrer"
                  className="text-darkLine"
                >
                  <p className="font-medium">Contact Supashyne</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="w-full flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-2 text-darkLine">Navigation</h3>
          <ul className="flex flex-col items-center md:items-start gap-2">
            {navItems.map((link) => (
              <li key={link.name} className="text-darkLine">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;