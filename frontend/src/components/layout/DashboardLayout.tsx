"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <TopNavbar />
      <main 
        className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-[280px]"
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
