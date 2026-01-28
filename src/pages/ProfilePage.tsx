import { User, Building2, Phone, Mail, Star, Award, Shield, FileText, Edit2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useMock } from "@/contexts/MockContext";
import { Link } from "react-router-dom";
import type { KYCStatus } from "@/types";

// KYC Status badge
function KYCStatusBadge({ status }: { status: KYCStatus }) {
  const variants: Record<KYCStatus, { className: string; label: string }> = {
    pending: { className: "bg-warning/10 text-warning border-warning/30", label: "Pending Verification" },
    under_review: { className: "bg-info/10 text-info border-info/30", label: "Under Review" },
    approved: { className: "bg-success/10 text-success border-success/30", label: "Verified" },
    rejected: { className: "bg-destructive/10 text-destructive border-destructive/30", label: "Rejected" },
  };
  const variant = variants[status];
  return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>;
}

// Star rating display
function StarRating({ rating, total }: { rating: number; total: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.round(rating)
              ? "fill-warning text-warning"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {rating.toFixed(1)} ({total} reviews)
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const { currentUser, isKYCApproved, canTrade } = useMock();

  if (!currentUser) return null;

  // Reputation score color
  const getReputationColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1>Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account details and reputation.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/profile/edit">
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl">
                  {currentUser.firstName[0]}
                  {currentUser.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              {currentUser.companyName && (
                <p className="text-muted-foreground">{currentUser.companyName}</p>
              )}
              <div className="mt-3">
                <KYCStatusBadge status={currentUser.kycStatus} />
              </div>

              <Separator className="my-6" />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="text-center">
                  <p className={`text-2xl font-semibold ${getReputationColor(currentUser.reputationScore)}`}>
                    {currentUser.reputationScore}
                  </p>
                  <p className="text-xs text-muted-foreground">Reputation</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">{currentUser.completedDeals}</p>
                  <p className="text-xs text-muted-foreground">Deals</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">{currentUser.averageRating.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>

              {currentUser.averageRating > 0 && (
                <div className="mt-4 w-full">
                  <StarRating rating={currentUser.averageRating} total={currentUser.totalRatings} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{currentUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{currentUser.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          {currentUser.companyName && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p className="font-medium">{currentUser.companyName}</p>
                </div>
                {currentUser.companyAddress && (
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{currentUser.companyAddress}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* KYC Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                KYC Verification
              </CardTitle>
              <CardDescription>
                Your identity verification status for trading
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${
                    isKYCApproved ? "bg-success/10" : "bg-warning/10"
                  }`}>
                    <FileText className={`h-5 w-5 ${
                      isKYCApproved ? "text-success" : "text-warning"
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">
                      {isKYCApproved ? "Verification Complete" : "Verification Required"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isKYCApproved 
                        ? "You have full trading access"
                        : "Complete verification to start trading"
                      }
                    </p>
                  </div>
                </div>
                {!isKYCApproved && (
                  <Button asChild>
                    <Link to="/profile/kyc">Complete KYC</Link>
                  </Button>
                )}
              </div>

              {!isKYCApproved && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Verification Progress</span>
                    <span className="font-medium">
                      {currentUser.kycStatus === "pending" ? "0%" : 
                       currentUser.kycStatus === "under_review" ? "50%" : "0%"}
                    </span>
                  </div>
                  <Progress 
                    value={currentUser.kycStatus === "under_review" ? 50 : 0} 
                    className="h-2"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Badges / Achievements */}
          {currentUser.completedDeals > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentUser.completedDeals >= 10 && (
                    <Badge variant="secondary" className="py-1.5">
                      🏆 10+ Deals
                    </Badge>
                  )}
                  {currentUser.completedDeals >= 50 && (
                    <Badge variant="secondary" className="py-1.5">
                      💎 50+ Deals
                    </Badge>
                  )}
                  {currentUser.completedDeals >= 100 && (
                    <Badge variant="secondary" className="py-1.5">
                      👑 100+ Deals
                    </Badge>
                  )}
                  {currentUser.averageRating >= 4.5 && (
                    <Badge variant="secondary" className="py-1.5">
                      ⭐ Top Rated
                    </Badge>
                  )}
                  {currentUser.reputationScore >= 90 && (
                    <Badge variant="secondary" className="py-1.5">
                      ✅ Trusted Trader
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
