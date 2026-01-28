import { Settings, Bell, Shield, Palette, Globe, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMock } from "@/contexts/MockContext";

export default function SettingsPage() {
  const { notificationSettings, updateNotificationSettings, logout } = useMock();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and notifications.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Navigation */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-4">
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Shield className="h-4 w-4" />
                Privacy & Security
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Palette className="h-4 w-4" />
                Appearance
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Globe className="h-4 w-4" />
                Language & Region
              </Button>
              <Separator className="my-2" />
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-destructive hover:text-destructive"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose which notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Listing Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Updates about your listings and new matching listings
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings?.listings ?? true}
                  onCheckedChange={(checked) => updateNotificationSettings({ listings: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bid Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    New bids, bid updates, and bid responses
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings?.bids ?? true}
                  onCheckedChange={(checked) => updateNotificationSettings({ bids: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Deal Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Deal progress, shipping updates, and completions
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings?.deals ?? true}
                  onCheckedChange={(checked) => updateNotificationSettings({ deals: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Payment confirmations and escrow updates
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings?.payments ?? true}
                  onCheckedChange={(checked) => updateNotificationSettings({ payments: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chat Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    New messages from other traders
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings?.chat ?? true}
                  onCheckedChange={(checked) => updateNotificationSettings({ chat: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Security alerts and important updates (cannot be disabled)
                  </p>
                </div>
                <Switch checked={true} disabled />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how the app looks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred color theme
                  </p>
                </div>
                <Select defaultValue="light">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Region
              </CardTitle>
              <CardDescription>
                Set your language and regional preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Language</Label>
                  <p className="text-sm text-muted-foreground">
                    Display language
                  </p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="gu">Gujarati</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Currency</Label>
                  <p className="text-sm text-muted-foreground">
                    Default currency for prices
                  </p>
                </div>
                <Select defaultValue="usd">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="inr">INR (₹)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
