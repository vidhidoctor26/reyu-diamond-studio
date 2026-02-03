import { 
  Users, 
  Gem, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  Activity,
  FileText,
  Settings,
  Eye,
  UserCheck,
  Package,
  Gavel,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useMock } from "@/contexts/MockContext";
import { otherTraders } from "@/data/mockUsers";
import { allListings } from "@/data/mockDiamonds";
import { allUserDeals } from "@/data/mockBidsDeals";

// ============================================
// Admin Dashboard
// ============================================

// Platform overview stats
function PlatformStats() {
  const stats = [
    { 
      label: "Total Users", 
      value: "2,847", 
      change: "+124", 
      trend: "up" as const,
      icon: Users,
      description: "Active traders"
    },
    { 
      label: "KYC Pending", 
      value: "38", 
      change: "-12", 
      trend: "down" as const,
      icon: Clock,
      description: "Awaiting verification"
    },
    { 
      label: "Active Listings", 
      value: allListings.length.toString(), 
      change: "+15", 
      trend: "up" as const,
      icon: Package,
      description: "On marketplace"
    },
    { 
      label: "Total Volume", 
      value: "$4.2M", 
      change: "+18%", 
      trend: "up" as const,
      icon: DollarSign,
      description: "This month"
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-sapphire/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-sapphire/10">
                <stat.icon className="h-5 w-5 text-sapphire" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === "up" ? "text-success" : "text-destructive"
              }`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// KYC queue overview
function KYCQueue() {
  const kycItems = [
    { id: 1, name: "Priya Sharma", company: "Sharma Gems Pvt Ltd", submitted: "2 hours ago", docs: 4, status: "pending" },
    { id: 2, name: "Amit Patel", company: "Patel Diamonds", submitted: "5 hours ago", docs: 3, status: "under_review" },
    { id: 3, name: "Neha Singh", company: "Singh Jewelers", submitted: "1 day ago", docs: 4, status: "pending" },
    { id: 4, name: "Vikram Joshi", company: "Joshi Trading Co.", submitted: "2 days ago", docs: 2, status: "incomplete" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Pending</Badge>;
      case "under_review":
        return <Badge variant="outline" className="bg-sapphire/10 text-sapphire border-sapphire/30">Under Review</Badge>;
      case "incomplete":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">Incomplete</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-sapphire" />
            <CardTitle className="text-lg">KYC Queue</CardTitle>
          </div>
          <Badge variant="secondary">38 pending</Badge>
        </div>
        <CardDescription>Users awaiting verification</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Docs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kycItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.company}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.submitted}</TableCell>
                <TableCell>{item.docs}/4</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <Button variant="outline" className="w-full mt-4">
          View All KYC Requests
        </Button>
      </CardContent>
    </Card>
  );
}

// User statistics breakdown
function UserStats() {
  const userBreakdown = [
    { label: "KYC Approved", count: 2456, color: "bg-success", icon: CheckCircle },
    { label: "KYC Pending", count: 38, color: "bg-warning", icon: Clock },
    { label: "KYC Rejected", count: 156, color: "bg-destructive", icon: XCircle },
    { label: "Suspended", count: 23, color: "bg-muted-foreground", icon: AlertTriangle },
  ];

  const total = userBreakdown.reduce((acc, item) => acc + item.count, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-sapphire" />
          <CardTitle className="text-lg">User Statistics</CardTitle>
        </div>
        <CardDescription>Platform user breakdown by status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-4 rounded-full overflow-hidden mb-6 bg-secondary">
          {userBreakdown.map((item) => (
            <div 
              key={item.label}
              className={`${item.color} transition-all duration-500`}
              style={{ width: `${(item.count / total) * 100}%` }}
            />
          ))}
        </div>
        
        <div className="space-y-3">
          {userBreakdown.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <item.icon className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-sm">{item.label}</span>
              <span className="font-medium">{item.count.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">
                ({((item.count / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Deal activity monitor
function DealActivity() {
  const dealStats = {
    created: 12,
    payment_pending: 8,
    in_escrow: 15,
    shipped: 6,
    completed: 234,
    disputed: 3,
  };

  const recentDeals = allUserDeals.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-sapphire" />
            <CardTitle className="text-lg">Deal Activity</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-secondary">
            <p className="text-2xl font-bold text-warning">{dealStats.in_escrow}</p>
            <p className="text-xs text-muted-foreground">In Escrow</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary">
            <p className="text-2xl font-bold text-sapphire">{dealStats.shipped}</p>
            <p className="text-xs text-muted-foreground">Shipped</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary">
            <p className="text-2xl font-bold text-destructive">{dealStats.disputed}</p>
            <p className="text-xs text-muted-foreground">Disputed</p>
          </div>
        </div>

        <div className="space-y-3">
          {recentDeals.map((deal) => (
            <div key={deal.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="p-2 rounded-lg bg-secondary">
                <Gavel className="h-4 w-4 text-sapphire" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Deal #{deal.id.slice(-6)}</p>
                <p className="text-xs text-muted-foreground">${deal.finalAmount.toLocaleString()}</p>
              </div>
              <Badge variant="outline" className="capitalize text-xs">
                {deal.status.replace("_", " ")}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Revenue chart placeholder
function RevenueOverview() {
  const monthlyData = [
    { month: "Jan", revenue: 320000 },
    { month: "Feb", revenue: 450000 },
    { month: "Mar", revenue: 380000 },
    { month: "Apr", revenue: 520000 },
    { month: "May", revenue: 610000 },
    { month: "Jun", revenue: 720000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-sapphire" />
            <CardTitle className="text-lg">Revenue Overview</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">2024</Badge>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Platform transaction volume by month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-48">
          {monthlyData.map((data) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-gradient-to-t from-sapphire to-sapphire/50 rounded-t-lg transition-all duration-500 hover:from-sapphire hover:to-sapphire/70"
                style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground">{data.month}</span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">$3.0M</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg. Deal Size</p>
            <p className="text-2xl font-bold">$42.5K</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Platform Fees</p>
            <p className="text-2xl font-bold">$150K</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Admin quick actions
function AdminQuickActions() {
  const actions = [
    { label: "User Management", icon: Users, href: "/admin/users" },
    { label: "KYC Review", icon: Shield, href: "/admin/kyc" },
    { label: "Dispute Center", icon: AlertTriangle, href: "/admin/disputes" },
    { label: "System Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Card key={action.label} className="group hover:shadow-lg hover:shadow-sapphire/5 transition-all cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-secondary group-hover:bg-sapphire/10 transition-colors">
              <action.icon className="h-6 w-6 text-muted-foreground group-hover:text-sapphire transition-colors" />
            </div>
            <div>
              <p className="font-medium">{action.label}</p>
              <p className="text-xs text-muted-foreground">Manage</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// System alerts
function SystemAlerts() {
  const alerts = [
    { type: "warning", message: "3 disputes require immediate attention", time: "10 min ago" },
    { type: "info", message: "System maintenance scheduled for Sunday 2AM", time: "1 hour ago" },
    { type: "success", message: "Daily backup completed successfully", time: "3 hours ago" },
  ];

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-warning/10 border-warning/30 text-warning";
      case "info":
        return "bg-sapphire/10 border-sapphire/30 text-sapphire";
      case "success":
        return "bg-success/10 border-success/30 text-success";
      default:
        return "bg-secondary border-border";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-sapphire" />
          <CardTitle className="text-lg">System Alerts</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div 
              key={i} 
              className={`p-3 rounded-lg border ${getAlertStyles(alert.type)}`}
            >
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs opacity-70 mt-1">{alert.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sapphire/10">
              <Shield className="h-6 w-6 text-sapphire" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Platform overview and management</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
            All Systems Operational
          </Badge>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Platform Stats */}
      <PlatformStats />

      {/* Quick Actions */}
      <AdminQuickActions />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <RevenueOverview />
        <DealActivity />
      </div>

      {/* Secondary Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <KYCQueue />
        <UserStats />
        <SystemAlerts />
      </div>
    </div>
  );
}
