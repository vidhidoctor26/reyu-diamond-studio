import { useLocation, NavLink as RouterNavLink } from "react-router-dom";
import { 
  Diamond, 
  Package, 
  Gavel, 
  MessageSquare, 
  Bell, 
  User, 
  Settings, 
  Gem, 
  Heart, 
  ShoppingBag,
  LayoutDashboard,
  Shield,
  Users,
  AlertTriangle,
  FileText
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useMock } from "@/contexts/MockContext";
import { Badge } from "@/components/ui/badge";

// Navigation items structure - User
const userNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, description: "Portfolio overview" },
  { title: "Listings", url: "/listings", icon: ShoppingBag, description: "Your active listings" },
  { title: "Marketplace", url: "/marketplace", icon: Gem, description: "Browse all diamonds" },
  { title: "Inventory", url: "/inventory", icon: Package, description: "Manage your stock" },
  { title: "Bids & Deals", url: "/bids", icon: Gavel, description: "Track negotiations" },
];

const communicationItems = [
  { title: "Chat", url: "/chat", icon: MessageSquare, badge: 2 },
  { title: "Notifications", url: "/notifications", icon: Bell, badge: 5 },
];

const accountNavItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Preferences", url: "/preferences", icon: Heart },
  { title: "Settings", url: "/settings", icon: Settings },
];

// Navigation items structure - Admin
const adminNavItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, description: "Platform overview" },
  { title: "User Management", url: "/admin/users", icon: Users, description: "Manage all users" },
  { title: "KYC Review", url: "/admin/kyc", icon: Shield, description: "Verification queue" },
  { title: "Disputes", url: "/admin/disputes", icon: AlertTriangle, description: "Resolve issues" },
  { title: "Reports", url: "/admin/reports", icon: FileText, description: "Analytics & reports" },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const { currentUser, isAdmin } = useMock();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* Logo / Brand */}
      <SidebarHeader className="border-b border-sidebar-border/50">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl shadow-glow",
            isAdmin ? "bg-gradient-to-br from-amber-500 to-orange-600" : "gradient-bg"
          )}>
            {isAdmin ? (
              <Shield className="h-5 w-5 text-white" />
            ) : (
              <Diamond className="h-5 w-5 text-white" />
            )}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground font-serif tracking-tight">
                {isAdmin ? "Admin Panel" : "Reyu Diamond"}
              </span>
              <span className="text-xs text-sidebar-foreground/50">
                {isAdmin ? "Platform Management" : "Trading Platform"}
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Admin Navigation */}
        {isAdmin && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-sidebar-foreground/40 text-xs font-medium uppercase tracking-wider px-3 mb-2">
              {!isCollapsed && "Administration"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                      className="h-11 rounded-xl transition-all duration-200"
                    >
                      <RouterNavLink
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                          isActive(item.url) && "bg-amber-500/20 text-amber-400 shadow-soft font-medium"
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </RouterNavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Main Navigation - User */}
        {!isAdmin && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-sidebar-foreground/40 text-xs font-medium uppercase tracking-wider px-3 mb-2">
              {!isCollapsed && "Trading"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {userNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                      className="h-11 rounded-xl transition-all duration-200"
                    >
                      <RouterNavLink
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                          isActive(item.url) && "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft font-medium"
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </RouterNavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Communication */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-sidebar-foreground/40 text-xs font-medium uppercase tracking-wider px-3 mb-2">
            {!isCollapsed && "Communication"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communicationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    className="h-11 rounded-xl transition-all duration-200"
                  >
                    <RouterNavLink
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                        isActive(item.url) && "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft font-medium"
                      )}
                    >
                      <div className="relative">
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.badge && item.badge > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-[10px] font-semibold flex items-center justify-center text-white">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && <span>{item.title}</span>}
                    </RouterNavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Navigation */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-sidebar-foreground/40 text-xs font-medium uppercase tracking-wider px-3 mb-2">
            {!isCollapsed && "Account"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    className="h-11 rounded-xl transition-all duration-200"
                  >
                    <RouterNavLink
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                        isActive(item.url) && "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft font-medium"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </RouterNavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold",
            isAdmin 
              ? "bg-amber-500/20 text-amber-400" 
              : "bg-sidebar-accent text-sidebar-accent-foreground"
          )}>
            {currentUser ? `${currentUser.firstName[0]}${currentUser.lastName[0]}` : "U"}
          </div>
          {!isCollapsed && currentUser && (
            <div className="flex flex-col overflow-hidden flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium text-sidebar-foreground">
                  {currentUser.firstName} {currentUser.lastName}
                </span>
                {isAdmin && (
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5 bg-amber-500/10 text-amber-400 border-amber-500/30">
                    Admin
                  </Badge>
                )}
              </div>
              <span className="truncate text-xs text-sidebar-foreground/50">
                {currentUser.companyName}
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
