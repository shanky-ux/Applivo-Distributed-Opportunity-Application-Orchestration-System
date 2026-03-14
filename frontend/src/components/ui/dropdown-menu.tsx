"use client";

import React from "react";

interface DropdownMenuProps {
  children: React.ReactNode;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  return <div className="relative inline-block">{children}</div>;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

function DropdownMenuTrigger({ children, asChild }: DropdownMenuTriggerProps) {
  return <>{children}</>;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

function DropdownMenuContent({ children, className = "", align = "end" }: DropdownMenuContentProps) {
  const alignClass = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  };
  
  return (
    <div className={`absolute ${alignClass[align]} top-full mt-2 z-50 min-w-[8rem] overflow-hidden rounded-lg border border-white/10 bg-card/80 backdrop-blur-xl p-1 shadow-lg ${className}`}>
      {children}
    </div>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function DropdownMenuItem({ children, className = "", onClick }: DropdownMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-white/10 hover:text-foreground transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

interface DropdownMenuLabelProps {
  children: React.ReactNode;
  className?: string;
}

function DropdownMenuLabel({ children, className = "" }: DropdownMenuLabelProps) {
  return (
    <div className={`px-2 py-1.5 text-sm font-semibold ${className}`}>
      {children}
    </div>
  );
}

interface DropdownMenuSeparatorProps {
  className?: string;
}

function DropdownMenuSeparator({ className = "" }: DropdownMenuSeparatorProps) {
  return <div className={`-mx-1 my-1 h-px bg-white/10 ${className}`} />;
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
