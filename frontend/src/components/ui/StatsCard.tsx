"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "./card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  color?: "primary" | "success" | "warning" | "info";
}

const colorClasses = {
  primary: "from-primary/20 to-purple-500/20 text-primary",
  success: "from-green-500/20 to-emerald-500/20 text-green-400",
  warning: "from-yellow-500/20 to-orange-500/20 text-yellow-400",
  info: "from-blue-500/20 to-cyan-500/20 text-blue-400",
};

const iconBgClasses = {
  primary: "bg-primary/20",
  success: "bg-green-500/20",
  warning: "bg-yellow-500/20",
  info: "bg-blue-500/20",
};

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description,
  color = "primary" 
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover:border-white/20 transition-all duration-300 group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-green-400" : "text-red-400"
                )}>
                  {trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  vs last week
                </span>
              </div>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-xl",
            iconBgClasses[color]
          )}>
            <Icon className={cn("h-6 w-6", colorClasses[color].split(" ")[2])} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
