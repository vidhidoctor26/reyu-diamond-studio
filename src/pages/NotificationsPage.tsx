import { Bell, Check, Trash2, Package, Gavel, MessageSquare, CreditCard, AlertCircle, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockNotifications } from "@/data/mockChatNotifications";
import { cn } from "@/lib/utils";
import type { NotificationType } from "@/types";
import { Link } from "react-router-dom";

// Icon for notification type
function NotificationIcon({ type }: { type: NotificationType }) {
  const icons: Record<NotificationType, { icon: React.ElementType; className: string }> = {
    preference_match: { icon: AlertCircle, className: "text-info" },
    new_bid: { icon: Gavel, className: "text-primary" },
    bid_accepted: { icon: Check, className: "text-success" },
    bid_rejected: { icon: AlertCircle, className: "text-destructive" },
    deal_update: { icon: Package, className: "text-primary" },
    payment_update: { icon: CreditCard, className: "text-success" },
    chat_message: { icon: MessageSquare, className: "text-accent" },
    admin_message: { icon: Bell, className: "text-warning" },
    kyc_update: { icon: AlertCircle, className: "text-info" },
  };
  const { icon: Icon, className } = icons[type] || icons.admin_message;
  return (
    <div className={cn("rounded-full p-2 bg-muted", className)}>
      <Icon className="h-4 w-4" />
    </div>
  );
}

// Time ago helper
function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1>Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated on bids, deals, and messages.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{mockNotifications.length}</p>
                <p className="text-sm text-muted-foreground">Total Notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <AlertCircle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <Check className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {mockNotifications.length - unreadCount}
                </p>
                <p className="text-sm text-muted-foreground">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {mockNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="font-medium">No notifications</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You're all caught up! Check back later.
              </p>
            </div>
          ) : (
            <ScrollArea className="max-h-[600px]">
              <div className="divide-y">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                      !notification.isRead && "bg-muted/30"
                    )}
                  >
                    <NotificationIcon type={notification.type} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={cn("font-medium", !notification.isRead && "text-foreground")}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-muted-foreground">
                            {timeAgo(notification.createdAt)}
                          </span>
                          {!notification.isRead && (
                            <div className="h-2 w-2 rounded-full bg-accent" />
                          )}
                        </div>
                      </div>
                      {notification.linkedEntityType && (
                        <Badge variant="outline" className="mt-2 text-xs capitalize">
                          {notification.linkedEntityType}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
