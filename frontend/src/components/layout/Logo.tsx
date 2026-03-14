"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  logoSrc?: string;
}

// To use your own logo:
// 1. Place your logo file in the /public folder (e.g., /public/logo.png)
// 2. Update the logoSrc prop below or use an environment variable

const DEFAULT_LOGO = "/logo.jpeg"; // Set to your logo path, e.g., "/logo.png"

export function Logo({ size = "md", showText = true, logoSrc }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-lg" },
    md: { icon: 36, text: "text-xl" },
    lg: { icon: 44, text: "text-2xl" },
  };

  const actualLogoSrc = logoSrc || DEFAULT_LOGO;

  // If using custom logo image
  if (actualLogoSrc) {
    return (
      <div className="flex items-center gap-2">
        <div 
          className="relative overflow-hidden rounded-xl"
          style={{ width: sizes[size].icon, height: sizes[size].icon }}
        >
          <Image
            src={actualLogoSrc}
            alt="Applivo Logo"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        {showText && (
          <span className={`${sizes[size].text} font-bold gradient-text`}>
            Applivo
          </span>
        )}
      </div>
    );
  }

  // Default gradient logo
  return (
    <div className="flex items-center gap-2">
      <div 
        className="flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/30"
        style={{ width: sizes[size].icon, height: sizes[size].icon }}
      >
        <Sparkles className="text-white" style={{ width: sizes[size].icon * 0.5, height: sizes[size].icon * 0.5 }} />
      </div>
      {showText && (
        <span className={`${sizes[size].text} font-bold gradient-text`}>
          Applivo
        </span>
      )}
    </div>
  );
}
