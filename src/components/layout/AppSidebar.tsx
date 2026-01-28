import { useLocation, NavLink as RouterNavLink } from "react-router-dom";
import { Diamond, LayoutGrid, Package, Gavel, MessageSquare, Bell, User, TrendingUp, Star, Settings } from "lucide-react";
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

// Navigation items structure
const mainNavItems = [
  { title: "Listings", url: "/listings", icon: LayoutGrid },
  { title: "Marketplace", url: "/marketplace", icon: TrendingUp },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Bids & Deals", url: "/bids", icon: Gavel },
  { title: "Chat", url: "/chat", icon: MessageSquare, badge: 3 },
  { title: "Notifications", url: "/notifications", icon: Bell, badge: 3 },
];

const accountNavItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Preferences", url: "/preferences", icon: Star },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const { currentUser } = useMock();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      {/* Logo / Brand */}
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Diamond className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">Reyu Diamond</span>
              <span className="text-xs text-muted-foreground">Trading Platform</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            {!isCollapsed && "Main Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <RouterNavLink
                      to={item.url}
                      className={cn(
                        "relative flex items-center gap-3",
                        isActive(item.url) && "font-medium"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                      {!isCollapsed && item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="ml-auto h-5 min-w-5 rounded-full bg-accent text-accent-foreground text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </RouterNavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
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
                  >
                    <RouterNavLink
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3",
                        isActive(item.url) && "font-medium"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
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
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <User className="h-4 w-4" />
          </div>
          {!isCollapsed && currentUser && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-sidebar-foreground">
                {currentUser.firstName} {currentUser.lastName}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {currentUser.companyName}
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
