import { useState } from "react";
import { Star, Plus, Edit2, Trash2, Bell, BellOff, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { mockPreferences } from "@/data/mockChatNotifications";
import { useMock } from "@/contexts/MockContext";
import type { DiamondPreference } from "@/types";

function PreferenceCard({ preference }: { preference: DiamondPreference }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{preference.name}</CardTitle>
            <CardDescription className="mt-1">
              Created {new Date(preference.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {preference.notificationsEnabled ? (
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <Bell className="h-3 w-3 mr-1" />
                Alerts On
              </Badge>
            ) : (
              <Badge variant="outline" className="text-muted-foreground">
                <BellOff className="h-3 w-3 mr-1" />
                Alerts Off
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Shapes */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Shapes</p>
          <div className="flex flex-wrap gap-1.5">
            {preference.shapes.map((shape) => (
              <Badge key={shape} variant="secondary" className="capitalize">
                {shape}
              </Badge>
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Carat Range</p>
            <p className="font-medium">
              {preference.caratRange.min} - {preference.caratRange.max} ct
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Price Range</p>
            <p className="font-medium">
              ${preference.priceRange.min.toLocaleString()} - ${preference.priceRange.max.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Colors */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Colors</p>
          <div className="flex flex-wrap gap-1.5">
            {preference.colors.map((color) => (
              <Badge key={color} variant="outline">
                {color}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clarities */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Clarities</p>
          <div className="flex flex-wrap gap-1.5">
            {preference.clarities.map((clarity) => (
              <Badge key={clarity} variant="outline">
                {clarity}
              </Badge>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Certifications</p>
          <div className="flex flex-wrap gap-1.5">
            {preference.certifications.map((cert) => (
              <Badge key={cert} variant="outline">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Switch checked={preference.notificationsEnabled} />
            <span className="text-sm text-muted-foreground">
              Notify on matches
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PreferencesPage() {
  const { canTrade } = useMock();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1>Preferences</h1>
          <p className="text-muted-foreground mt-1">
            Save your diamond preferences for quick notifications on matching listings.
          </p>
        </div>
        <Button disabled={!canTrade}>
          <Plus className="h-4 w-4 mr-2" />
          Create Preference
        </Button>
      </div>

      {/* Info Card */}
      <Card className="bg-muted/50">
        <CardContent className="flex items-start gap-3 p-4">
          <Star className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Private Preferences</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your preferences are private and only used to notify you when matching diamonds 
              are listed. Other users cannot see your preferences.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search preferences..." className="pl-9" />
      </div>

      {/* Preferences List */}
      {mockPreferences.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Star className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="font-medium text-lg">No preferences saved</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Create a preference to get notified when matching diamonds are listed.
            </p>
            <Button disabled={!canTrade}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Preference
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {mockPreferences.map((preference) => (
            <PreferenceCard key={preference.id} preference={preference} />
          ))}
        </div>
      )}
    </div>
  );
}
