"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Link, 
  Mail, 
  MessageSquare,
  Calendar,
  Save,
  Check
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    location: "San Francisco, CA",
    experienceLevel: "Senior",
    preferredRoles: ["Software Engineer", "Full Stack Developer", "Backend Engineer"],
    preferredLocations: ["Remote", "San Francisco, CA", "New York, NY"],
  });

  const [automation, setAutomation] = useState({
    autoApply: false,
    approvalRequired: true,
    dailyApplicationLimit: 10,
  });

  const [integrations, setIntegrations] = useState({
    email: "john@example.com",
    telegram: "",
    calendar: "google",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    interviewReminders: true,
    applicationUpdates: true,
    weeklyDigest: false,
  });

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Settings
            </CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-2">Full Name</label>
                <Input 
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Email</label>
                <Input 
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-2">Location</label>
                <Input 
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Experience Level</label>
                <select 
                  className="w-full px-3 py-2 rounded-lg bg-card border border-white/10"
                  value={profile.experienceLevel}
                  onChange={(e) => setProfile({ ...profile, experienceLevel: e.target.value })}
                >
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior</option>
                  <option>Lead</option>
                  <option>Manager</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">Preferred Roles</label>
              <Input 
                value={profile.preferredRoles.join(", ")}
                onChange={(e) => setProfile({ ...profile, preferredRoles: e.target.value.split(", ") })}
              />
            </div>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Automation Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Automation Settings
            </CardTitle>
            <CardDescription>Control your automation preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto Apply</p>
                <p className="text-sm text-muted-foreground">Automatically apply to matching jobs</p>
              </div>
              <Switch 
                checked={automation.autoApply}
                onCheckedChange={(checked) => setAutomation({ ...automation, autoApply: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Approval Required</p>
                <p className="text-sm text-muted-foreground">Require approval before applying</p>
              </div>
              <Switch 
                checked={automation.approvalRequired}
                onCheckedChange={(checked) => setAutomation({ ...automation, approvalRequired: checked })}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">Daily Application Limit</label>
              <Input 
                type="number"
                value={automation.dailyApplicationLimit}
                onChange={(e) => setAutomation({ ...automation, dailyApplicationLimit: parseInt(e.target.value) })}
                className="max-w-xs"
              />
            </div>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-400" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch 
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive browser notifications</p>
              </div>
              <Switch 
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Interview Reminders</p>
                <p className="text-sm text-muted-foreground">Get reminded about upcoming interviews</p>
              </div>
              <Switch 
                checked={notifications.interviewReminders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, interviewReminders: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Application Updates</p>
                <p className="text-sm text-muted-foreground">Get notified about application status changes</p>
              </div>
              <Switch 
                checked={notifications.applicationUpdates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, applicationUpdates: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Digest</p>
                <p className="text-sm text-muted-foreground">Receive weekly summary</p>
              </div>
              <Switch 
                checked={notifications.weeklyDigest}
                onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-purple-400" />
              Integrations
            </CardTitle>
            <CardDescription>Connect your accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{integrations.email}</p>
                </div>
              </div>
              <Badge variant="success">
                <Check className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Telegram</p>
                  <p className="text-sm text-muted-foreground">{integrations.telegram || "Not connected"}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Calendar</p>
                  <p className="text-sm text-muted-foreground">{integrations.calendar === "google" ? "Google Calendar" : "Not connected"}</p>
                </div>
              </div>
              <Badge variant="success">
                <Check className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
