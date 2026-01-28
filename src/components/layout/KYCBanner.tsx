import { AlertTriangle, XCircle, Clock, CheckCircle } from "lucide-react";
import { useMock } from "@/contexts/MockContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function KYCBanner() {
  const { currentUser, canTrade } = useMock();

  // Don't show banner if user can trade (KYC approved and active)
  if (!currentUser || canTrade) return null;

  // Determine banner type based on user status
  const getBannerConfig = () => {
    if (currentUser.userStatus === "suspended") {
      return {
        icon: XCircle,
        title: "Account Suspended",
        message: "Your account has been suspended. Please contact support for more information.",
        variant: "destructive" as const,
        action: null,
      };
    }

    switch (currentUser.kycStatus) {
      case "pending":
        return {
          icon: Clock,
          title: "Complete Your KYC Verification",
          message: "KYC verification is mandatory to trade on Reyu Diamond. Submit your documents to get started.",
          variant: "warning" as const,
          action: (
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/profile/kyc">Complete KYC</Link>
            </Button>
          ),
        };
      case "under_review":
        return {
          icon: Clock,
          title: "KYC Under Review",
          message: "Your documents are being reviewed. This usually takes 1-2 business days.",
          variant: "info" as const,
          action: null,
        };
      case "rejected":
        return {
          icon: XCircle,
          title: "KYC Verification Failed",
          message: "Your KYC submission was rejected. Please review the feedback and resubmit your documents.",
          variant: "destructive" as const,
          action: (
            <Button asChild size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
              <Link to="/profile/kyc">Resubmit Documents</Link>
            </Button>
          ),
        };
      default:
        return null;
    }
  };

  const config = getBannerConfig();
  if (!config) return null;

  const variantStyles = {
    warning: "bg-warning/10 border-warning/30 text-warning",
    info: "bg-info/10 border-info/30 text-info",
    destructive: "bg-destructive/10 border-destructive/30 text-destructive",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b px-4 py-3",
        variantStyles[config.variant]
      )}
    >
      <div className="flex items-center gap-3">
        <config.icon className="h-5 w-5 shrink-0" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="font-medium">{config.title}</span>
          <span className="text-sm opacity-90">{config.message}</span>
        </div>
      </div>
      {config.action && <div className="shrink-0">{config.action}</div>}
    </div>
  );
}
