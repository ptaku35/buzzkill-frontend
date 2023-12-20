import React from "react";
import { Link, Image, ImageProps } from "@chakra-ui/react";
import styles from "./MapNavigation.module.css";

// Define a type for responsive style
type ResponsiveStyle =
  | string
  | { base: string; md: string; [key: string]: any };

interface MapNavigationProps {
  top: ResponsiveStyle;
  left: ResponsiveStyle;
  href: string;
  imageSrc: string;
}

const MapNavigation: React.FC<MapNavigationProps> = ({
  top,
  left,
  href,
  imageSrc,
}) => {
  const imageStyles: ImageProps = {
    position: "absolute",
    top: top,
    left: left,
    transform: {
      base: "translateY(-50%) scale(0.15)",
      md: "translateY(-50%) scale(0.2)",
    },
    width: { base: "10vw", md: "40vw" },
    zIndex: 2,
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <Link href={href}>
      <Image
        src={imageSrc}
        alt="Overlay Image"
        _hover={{ transform: "translateY(-50%) scale(0.22)" }}
        {...imageStyles}
      />
    </Link>
  );
};

export default MapNavigation;
