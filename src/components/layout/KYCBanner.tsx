import { AlertTriangle, XCircle, Clock, Shield, ArrowRight, X } from "lucide-react";
import { useMock } from "@/contexts/MockContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export function KYCBanner() {
  const { currentUser, canTrade } = useMock();
  const [dismissed, setDismissed] = useState(false);

  // Don't show banner if user can trade (KYC approved and active)
  if (!currentUser || canTrade || dismissed) return null;

  // Determine banner type based on user status
  const getBannerConfig = () => {
    if (currentUser.userStatus === "suspended") {
      return {
        icon: XCircle,
        title: "Account Suspended",
        message: "Your account has been suspended. Please contact support for assistance.",
        variant: "destructive" as const,
        action: (
          <Button size="sm" variant="default" className="gap-2">
            Contact Support
            <ArrowRight className="w-4 h-4" />
          </Button>
        ),
        dismissable: false,
      };
    }

    switch (currentUser.kycStatus) {
      case "pending":
        return {
          icon: Shield,
          title: "Complete Your Verification",
          message: "Verify your identity to unlock full trading capabilities and start making deals.",
          variant: "warning" as const,
          action: (
            <Button asChild size="sm" variant="default" className="gap-2">
              <Link to="/profile/kyc">
                Complete KYC
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          ),
          dismissable: true,
        };
      case "under_review":
        return {
          icon: Clock,
          title: "Verification In Progress",
          message: "We're reviewing your documents. This usually takes 1-2 business days.",
          variant: "info" as const,
          action: null,
          dismissable: true,
        };
      case "rejected":
        return {
          icon: XCircle,
          title: "Verification Unsuccessful",
          message: "There was an issue with your verification. Please review and resubmit your documents.",
          variant: "destructive" as const,
          action: (
            <Button asChild size="sm" variant="default" className="gap-2">
              <Link to="/profile/kyc">
                Resubmit Documents
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          ),
          dismissable: true,
        };
      default:
        return null;
    }
  };

  const config = getBannerConfig();
  if (!config) return null;

  const variantStyles = {
    warning: "bg-warning/5 border-warning/20",
    info: "bg-info/5 border-info/20",
    destructive: "bg-destructive/5 border-destructive/20",
  };

  const iconStyles = {
    warning: "text-warning bg-warning/10",
    info: "text-info bg-info/10",
    destructive: "text-destructive bg-destructive/10",
  };

  return (
    <div
      className={cn(
        "relative border-b animate-fade-in",
        variantStyles[config.variant]
      )}
    >
      <div className="container py-3 px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn("p-2 rounded-xl", iconStyles[config.variant])}>
              <config.icon className="h-5 w-5 shrink-0" />
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">{config.title}</p>
              <p className="text-sm text-muted-foreground">{config.message}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {config.action}
            {config.dismissable && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg hover:bg-background/50"
                onClick={() => setDismissed(true)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
