import { 
  Gem, 
  TrendingUp, 
  TrendingDown,
  Wallet,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Target,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMock } from "@/contexts/MockContext";
import { Link } from "react-router-dom";
import { mockUserInventory, mockUserListings } from "@/data/mockDiamonds";
import { allUserDeals } from "@/data/mockBidsDeals";

// ============================================
// Portfolio Dashboard - User View
// ============================================

// Portfolio stats with premium styling
function PortfolioValueCard() {
  // Calculate total inventory value (mock calculation)
  const inventoryValue = mockUserInventory.reduce((acc, diamond) => {
    const basePrice = diamond.caratWeight * 5000; // Simplified calculation
    const qualityMultiplier = diamond.clarity === "FL" || diamond.clarity === "IF" ? 2.5 : 
                              diamond.clarity.startsWith("VVS") ? 2 : 
                              diamond.clarity.startsWith("VS") ? 1.5 : 1;
    return acc + (basePrice * qualityMultiplier);
  }, 0);

  const listedValue = mockUserListings.reduce((acc, listing) => acc + listing.askingPrice, 0);
  const completedValue = allUserDeals
    .filter(d => d.status === "completed")
    .reduce((acc, deal) => acc + deal.finalAmount, 0);

  return (
    <Card className="col-span-full lg:col-span-2 bg-gradient-to-br from-sapphire/10 via-background to-midnight/5 border-sapphire/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-sapphire/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-sapphire/10">
            <Wallet className="h-5 w-5 text-sapphire" />
          </div>
          <div>
            <CardTitle className="text-lg">Portfolio Value</CardTitle>
            <CardDescription>Total estimated inventory worth</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold tracking-tight">
            ${inventoryValue.toLocaleString()}
          </span>
          <Badge variant="outline" className="text-success border-success/30 bg-success/10">
            <TrendingUp className="h-3 w-3 mr-1" />
            +8.2%
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-sm text-muted-foreground">Listed Value</p>
            <p className="text-xl font-semibold">${listedValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed Sales</p>
            <p className="text-xl font-semibold">${completedValue.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Performance metrics card
function PerformanceCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  subtitle
}: { 
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: React.ElementType;
  subtitle?: string;
}) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Target;
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  
  return (
    <Card className="group hover:shadow-lg hover:shadow-sapphire/5 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-secondary group-hover:bg-sapphire/10 transition-colors">
            <Icon className="h-5 w-5 text-muted-foreground group-hover:text-sapphire transition-colors" />
          </div>
          <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
            <TrendIcon className="h-3 w-3" />
            <span>{change}</span>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

// Inventory breakdown chart (visual representation)
function InventoryBreakdown() {
  const available = mockUserInventory.filter(d => d.status === "available").length;
  const listed = mockUserInventory.filter(d => d.status === "listed").length;
  const locked = mockUserInventory.filter(d => d.status === "locked").length;
  const completed = mockUserInventory.filter(d => d.status === "completed").length;
  const total = mockUserInventory.length;

  const segments = [
    { label: "Available", count: available, color: "bg-status-available", percentage: (available / total) * 100 },
    { label: "Listed", count: listed, color: "bg-status-listed", percentage: (listed / total) * 100 },
    { label: "Locked", count: locked, color: "bg-status-locked", percentage: (locked / total) * 100 },
    { label: "Completed", count: completed, color: "bg-muted-foreground", percentage: (completed / total) * 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-sapphire" />
            <CardTitle className="text-lg">Inventory Status</CardTitle>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/inventory">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex h-4 rounded-full overflow-hidden mb-6 bg-secondary">
          {segments.map((seg, i) => (
            <div 
              key={seg.label}
              className={`${seg.color} transition-all duration-500`}
              style={{ width: `${seg.percentage}%` }}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${seg.color}`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{seg.label}</p>
                <p className="text-xs text-muted-foreground">{seg.count} stones</p>
              </div>
              <span className="text-sm font-medium">{seg.percentage.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Market trends section
function MarketTrends() {
  const trends = [
    { shape: "Round", change: "+5.2%", trend: "up" as const, price: "$12,500/ct" },
    { shape: "Oval", change: "+3.8%", trend: "up" as const, price: "$11,200/ct" },
    { shape: "Emerald", change: "-1.2%", trend: "down" as const, price: "$9,800/ct" },
    { shape: "Cushion", change: "+2.1%", trend: "up" as const, price: "$10,500/ct" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-sapphire" />
            <CardTitle className="text-lg">Market Trends</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">Live</Badge>
        </div>
        <CardDescription>Indicative pricing by shape (D-F, VVS1-VS1)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trends.map((item) => (
            <div key={item.shape} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Gem className="h-4 w-4 text-sapphire" />
                </div>
                <span className="font-medium">{item.shape}</span>
              </div>
              <div className="text-right">
                <p className="font-medium">{item.price}</p>
                <p className={`text-sm ${item.trend === "up" ? "text-success" : "text-destructive"}`}>
                  {item.change}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link to="/marketplace">
            View Full Market Reference
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// Recent activity feed
function RecentActivity() {
  const activities = [
    { type: "bid_received", message: "New bid on 2.01ct Princess", time: "2 hours ago", icon: Sparkles },
    { type: "deal_update", message: "Deal #D-2024-001 shipped", time: "5 hours ago", icon: Package },
    { type: "price_alert", message: "Round prices up 3%", time: "1 day ago", icon: TrendingUp },
    { type: "listing_view", message: "Your listing viewed 25 times", time: "2 days ago", icon: Target },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Latest updates on your portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
              <div className="p-2 rounded-lg bg-secondary shrink-0">
                <activity.icon className="h-4 w-4 text-sapphire" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" className="w-full mt-4" asChild>
          <Link to="/notifications">View All Activity</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// Quick actions with premium styling
function QuickActions() {
  const { canTrade } = useMock();
  
  const actions = [
    { 
      label: "List a Diamond", 
      description: "Add inventory to marketplace",
      icon: Package, 
      href: "/inventory",
      disabled: !canTrade,
      primary: true
    },
    { 
      label: "Browse Listings", 
      description: "Find diamonds to purchase",
      icon: Gem, 
      href: "/listings",
      disabled: false 
    },
    { 
      label: "View Bids", 
      description: "Manage your active bids",
      icon: Target, 
      href: "/bids",
      disabled: false 
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {actions.map((action) => (
        <Card 
          key={action.label}
          className={`group relative overflow-hidden transition-all duration-300 ${
            action.primary 
              ? "bg-gradient-to-br from-sapphire/10 to-midnight/10 border-sapphire/20 hover:border-sapphire/40" 
              : "hover:shadow-lg hover:shadow-sapphire/5"
          } ${action.disabled ? "opacity-60" : ""}`}
        >
          {action.primary && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-sapphire/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          )}
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${action.primary ? "bg-sapphire/20" : "bg-secondary"}`}>
                <action.icon className={`h-6 w-6 ${action.primary ? "text-sapphire" : "text-muted-foreground"}`} />
              </div>
              {!action.disabled && (
                <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
            <h3 className="font-semibold mb-1">{action.label}</h3>
            <p className="text-sm text-muted-foreground">{action.description}</p>
            
            {action.disabled ? (
              <Badge variant="outline" className="mt-4 text-xs">Complete KYC</Badge>
            ) : (
              <Button 
                variant={action.primary ? "default" : "outline"} 
                size="sm" 
                className="mt-4"
                asChild
              >
                <Link to={action.href}>Get Started</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { currentUser } = useMock();
  
  const totalStones = mockUserInventory.length;
  const activeListings = mockUserListings.filter(l => l.status === "active").length;
  const completedDeals = allUserDeals.filter(d => d.status === "completed").length;
  const pendingDeals = allUserDeals.filter(d => !["completed", "cancelled"].includes(d.status)).length;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {currentUser?.firstName}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your diamond portfolio performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
            Market Open
          </Badge>
        </div>
      </div>

      {/* Portfolio Value + Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PortfolioValueCard />
        <PerformanceCard 
          title="Total Stones"
          value={totalStones.toString()}
          change="+2"
          trend="up"
          icon={Gem}
          subtitle="in inventory"
        />
        <PerformanceCard 
          title="Active Listings"
          value={activeListings.toString()}
          change="+1"
          trend="up"
          icon={Package}
          subtitle="on marketplace"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <InventoryBreakdown />
        <MarketTrends />
        <RecentActivity />
      </div>

      {/* Performance Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PerformanceCard 
          title="Completed Deals"
          value={completedDeals.toString()}
          change="+15%"
          trend="up"
          icon={TrendingUp}
          subtitle="this quarter"
        />
        <PerformanceCard 
          title="Pending Deals"
          value={pendingDeals.toString()}
          change="stable"
          trend="stable"
          icon={Target}
          subtitle="in progress"
        />
        <PerformanceCard 
          title="Avg. Deal Value"
          value="$42,500"
          change="+8%"
          trend="up"
          icon={Wallet}
          subtitle="per transaction"
        />
        <PerformanceCard 
          title="Win Rate"
          value="68%"
          change="+5%"
          trend="up"
          icon={Sparkles}
          subtitle="bids accepted"
        />
      </div>
    </div>
  );
}
