  // Menu items pour lanavbar et le footer sur la partie non protégé du site

  interface NavItem {
    name: string;
    href: string;
  }

  export const navItems: NavItem[] = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    // { name: "About", href: "/about" },
    // { name: "Contact", href: "/contact" },
  ];