import { Menu, Bell, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useMock } from "@/contexts/MockContext";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { MockUserType } from "@/config/mockMode";

// KYC Status badge component
function KYCStatusBadge({ status }: { status: string }) {
  const variants: Record<string, { className: string; label: string }> = {
    pending: { className: "bg-warning/10 text-warning border-warning/30", label: "KYC Pending" },
    under_review: { className: "bg-info/10 text-info border-info/30", label: "Under Review" },
    approved: { className: "bg-success/10 text-success border-success/30", label: "Verified" },
    rejected: { className: "bg-destructive/10 text-destructive border-destructive/30", label: "KYC Rejected" },
  };

  const variant = variants[status] || variants.pending;

  return (
    <Badge variant="outline" className={variant.className}>
      {variant.label}
    </Badge>
  );
}

// Mock user switcher for testing
function MockUserSwitcher() {
  const { currentUserType, setMockUserType, isMockMode } = useMock();

  if (!isMockMode) return null;

  const userOptions: { type: MockUserType; label: string; description: string }[] = [
    { type: "kyc_approved", label: "Verified User", description: "Full trading access" },
    { type: "kyc_pending", label: "Pending KYC", description: "Limited access" },
    { type: "kyc_rejected", label: "Rejected KYC", description: "Re-submit required" },
    { type: "suspended", label: "Suspended User", description: "Account blocked" },
  ];

  const currentOption = userOptions.find((o) => o.type === currentUserType);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <span className="font-medium">Mock:</span>
          <span>{currentOption?.label}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Switch Mock User State
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userOptions.map((option) => (
          <DropdownMenuItem
            key={option.type}
            onClick={() => setMockUserType(option.type)}
            className="flex flex-col items-start gap-0.5"
          >
            <span className="font-medium">{option.label}</span>
            <span className="text-xs text-muted-foreground">{option.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppHeader() {
  const { currentUser } = useMock();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background px-4">
      {/* Sidebar Toggle */}
      <SidebarTrigger className="-ml-1" />

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search diamonds, listings, deals..."
            className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Mock User Switcher (only in mock mode) */}
        <MockUserSwitcher />

        {/* KYC Status */}
        {currentUser && <KYCStatusBadge status={currentUser.kycStatus} />}

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
