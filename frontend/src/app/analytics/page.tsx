"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Briefcase,
  MessageCircle,
  Award,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/ui/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAnalytics } from "@/hooks/useApi";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#eab308", "#22c55e", "#14b8a6"];

export default function AnalyticsPage() {
  const { data: analytics } = useAnalytics();

  const stats = [
    { 
      title: "Total Applications", 
      value: analytics?.totalApplications || 0, 
      icon: Briefcase, 
      trend: { value: 15, isPositive: true },
      color: "primary" as const
    },
    { 
      title: "Response Rate", 
      value: `${analytics?.responseRate || 0}%`, 
      icon: MessageCircle, 
      trend: { value: 5, isPositive: true },
      color: "success" as const
    },
    { 
      title: "Interview Rate", 
      value: `${analytics?.interviewRate || 0}%`, 
      icon: Users, 
      trend: { value: 2, isPositive: true },
      color: "info" as const
    },
    { 
      title: "Offer Rate", 
      value: `${analytics?.offerRate || 0}%`, 
      icon: Award, 
      trend: { value: 1, isPositive: true },
      color: "warning" as const
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Career insights and performance metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications per Week */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Applications per Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sampleAnalytics.applicationsPerWeek}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="week" 
                      stroke="#888888" 
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(0,0,0,0.8)", 
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#6366f1" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Skill Demand */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Top Skills in Demand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={sampleAnalytics.skillsDemand} 
                    layout="vertical"
                    margin={{ left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" stroke="#888888" fontSize={12} />
                    <YAxis 
                      dataKey="skill" 
                      type="category" 
                      stroke="#888888" 
                      fontSize={12}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(0,0,0,0.8)", 
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="count" fill="#22c55e" radius={[0, 4, 4, 0]}>
                      {sampleAnalytics.skillsDemand.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funnel Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Application Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-xl bg-primary/10">
                <p className="text-3xl font-bold text-primary">{sampleAnalytics.totalApplications}</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-green-500/10">
                <p className="text-3xl font-bold text-green-400">{sampleAnalytics.totalResponses}</p>
                <p className="text-sm text-muted-foreground">Responses</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-cyan-500/10">
                <p className="text-3xl font-bold text-cyan-400">{sampleAnalytics.totalInterviews}</p>
                <p className="text-sm text-muted-foreground">Interviews</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-yellow-500/10">
                <p className="text-3xl font-bold text-yellow-400">{sampleAnalytics.totalOffers}</p>
                <p className="text-sm text-muted-foreground">Offers</p>
              </div>
            </div>
            
            {/* Conversion Rates */}
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {sampleAnalytics.responseRate}% response rate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {sampleAnalytics.interviewRate}% interview rate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {sampleAnalytics.offerRate}% offer rate
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
