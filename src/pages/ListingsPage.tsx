import { Package, TrendingUp, Gavel, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMock } from "@/contexts/MockContext";
import { Link } from "react-router-dom";
import { otherTradersListings } from "@/data/mockDiamonds";
import { mockUserBids, allUserDeals } from "@/data/mockBidsDeals";
import { mockNotifications } from "@/data/mockChatNotifications";

// Stats card component
function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {trend && (
          <p className={`text-xs mt-1 ${trend.isPositive ? "text-success" : "text-destructive"}`}>
            {trend.isPositive ? "+" : ""}{trend.value}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Recent listing card
function ListingCard({ listing }: { listing: typeof otherTradersListings[0] }) {
  const { diamond, askingPrice, seller, bidCount } = listing;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square bg-muted flex items-center justify-center">
        <Package className="h-12 w-12 text-muted-foreground/50" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h4 className="font-medium capitalize">{diamond.shape}</h4>
            <p className="text-sm text-muted-foreground">
              {diamond.caratWeight}ct • {diamond.color} • {diamond.clarity}
            </p>
          </div>
          <Badge variant="outline" className="shrink-0">{diamond.certification}</Badge>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="text-lg font-semibold">${askingPrice.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{bidCount} bids</p>
          </div>
          <Button size="sm" asChild>
            <Link to={`/listings/${listing.id}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ListingsPage() {
  const { currentUser, canTrade } = useMock();
  
  // Stats
  const activeListings = otherTradersListings.filter((l) => l.status === "active").length;
  const pendingBids = mockUserBids.filter((b) => b.status === "pending").length;
  const activeDeals = allUserDeals.filter((d) => !["completed", "cancelled"].includes(d.status)).length;
  const unreadNotifications = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1>Welcome back, {currentUser?.firstName}</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in the diamond marketplace today.
          </p>
        </div>
        {canTrade && (
          <Button asChild>
            <Link to="/inventory">
              <Package className="h-4 w-4 mr-2" />
              List a Diamond
            </Link>
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Listings"
          value={activeListings}
          subtitle="Available to browse"
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Your Pending Bids"
          value={pendingBids}
          subtitle="Awaiting response"
          icon={Gavel}
        />
        <StatCard
          title="Active Deals"
          value={activeDeals}
          subtitle="In progress"
          icon={TrendingUp}
        />
        <StatCard
          title="Unread Notifications"
          value={unreadNotifications}
          subtitle="Requires attention"
          icon={CheckCircle}
        />
      </div>

      {/* Recent Listings Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2>Recent Listings</h2>
          <Button variant="ghost" asChild>
            <Link to="/listings/browse">View All</Link>
          </Button>
        </div>
        
        {!canTrade && (
          <div className="mb-4 rounded-lg border border-warning/30 bg-warning/10 p-4">
            <p className="text-sm text-warning">
              <strong>Trading Restricted:</strong> Complete your KYC verification to place bids on listings.
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherTradersListings.slice(0, 4).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Manage Inventory</h4>
              <p className="text-sm text-muted-foreground">View and list your diamonds</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/inventory">Go</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-accent/10 p-3">
              <Gavel className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">View Your Bids</h4>
              <p className="text-sm text-muted-foreground">Track bid statuses</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/bids/my-bids">Go</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-success/10 p-3">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Market Reference</h4>
              <p className="text-sm text-muted-foreground">Check indicative prices</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/marketplace">Go</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
