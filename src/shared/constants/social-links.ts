import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import type { IconType } from "react-icons";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
  handle?: string;
  hoverColor?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/gcginnovate",
    icon: FaLinkedin,
    handle: "gcginnovate",
    hoverColor: "#0A66C2",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/gcginnovate",
    icon: FaInstagram,
    hoverColor: "#E1306C",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/gcginnovate",
    icon: FaFacebook,
    hoverColor: "#1877F2",
  },
];
