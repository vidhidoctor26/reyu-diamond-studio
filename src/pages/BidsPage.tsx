import { useState } from "react";
import { Gavel, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockUserBids, mockBidsOnUserListings, allUserDeals } from "@/data/mockBidsDeals";
import { useMock } from "@/contexts/MockContext";
import type { BidStatus, DealStatus } from "@/types";

// Bid status badge
function BidStatusBadge({ status }: { status: BidStatus }) {
  const variants: Record<BidStatus, { className: string; label: string; icon: React.ElementType }> = {
    pending: { className: "bg-warning/10 text-warning border-warning/30", label: "Pending", icon: Clock },
    accepted: { className: "bg-success/10 text-success border-success/30", label: "Accepted", icon: CheckCircle },
    rejected: { className: "bg-destructive/10 text-destructive border-destructive/30", label: "Rejected", icon: XCircle },
    cancelled: { className: "bg-muted text-muted-foreground border-muted", label: "Cancelled", icon: XCircle },
    expired: { className: "bg-muted text-muted-foreground border-muted", label: "Expired", icon: AlertCircle },
  };
  const variant = variants[status];
  const Icon = variant.icon;
  return (
    <Badge variant="outline" className={variant.className}>
      <Icon className="h-3 w-3 mr-1" />
      {variant.label}
    </Badge>
  );
}

// Deal status badge
function DealStatusBadge({ status }: { status: DealStatus }) {
  const variants: Record<DealStatus, { className: string; label: string }> = {
    created: { className: "bg-muted text-muted-foreground", label: "Created" },
    payment_pending: { className: "bg-warning/10 text-warning border-warning/30", label: "Payment Pending" },
    in_escrow: { className: "bg-info/10 text-info border-info/30", label: "In Escrow" },
    shipped: { className: "bg-[hsl(var(--deal-shipped)/0.1)] text-[hsl(var(--deal-shipped))]", label: "Shipped" },
    delivered: { className: "bg-success/10 text-success border-success/30", label: "Delivered" },
    completed: { className: "bg-success/10 text-success border-success/30", label: "Completed" },
    disputed: { className: "bg-destructive/10 text-destructive border-destructive/30", label: "Disputed" },
    cancelled: { className: "bg-muted text-muted-foreground", label: "Cancelled" },
  };
  const variant = variants[status];
  return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>;
}

export default function BidsPage() {
  const { currentUser } = useMock();
  const [activeTab, setActiveTab] = useState("my-bids");

  // Stats
  const myPendingBids = mockUserBids.filter((b) => b.status === "pending").length;
  const receivedPendingBids = mockBidsOnUserListings.filter((b) => b.status === "pending").length;
  const activeDeals = allUserDeals.filter((d) => !["completed", "cancelled"].includes(d.status)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Bids & Deals</h1>
        <p className="text-muted-foreground mt-1">
          Manage your bids and track deal progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <ArrowUpRight className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{myPendingBids}</p>
                <p className="text-sm text-muted-foreground">Pending Bids Placed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <ArrowDownLeft className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{receivedPendingBids}</p>
                <p className="text-sm text-muted-foreground">Pending Bids Received</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <Gavel className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{activeDeals}</p>
                <p className="text-sm text-muted-foreground">Active Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {allUserDeals.filter((d) => d.status === "completed").length}
                </p>
                <p className="text-sm text-muted-foreground">Completed Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="my-bids">
            My Bids ({mockUserBids.length})
          </TabsTrigger>
          <TabsTrigger value="received">
            Received Bids ({mockBidsOnUserListings.length})
          </TabsTrigger>
          <TabsTrigger value="deals">
            Deals ({allUserDeals.length})
          </TabsTrigger>
        </TabsList>

        {/* My Bids Tab */}
        <TabsContent value="my-bids" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bids You've Placed</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Diamond</TableHead>
                    <TableHead>Asking Price</TableHead>
                    <TableHead>Your Bid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUserBids.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium capitalize">{bid.listing.diamond.shape}</p>
                          <p className="text-sm text-muted-foreground">
                            {bid.listing.diamond.caratWeight}ct • {bid.listing.diamond.color} • {bid.listing.diamond.clarity}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>${bid.listing.askingPrice.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">${bid.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <BidStatusBadge status={bid.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(bid.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Received Bids Tab */}
        <TabsContent value="received" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bids on Your Listings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Your Listing</TableHead>
                    <TableHead>Bidder</TableHead>
                    <TableHead>Asking Price</TableHead>
                    <TableHead>Bid Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBidsOnUserListings.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium capitalize">{bid.listing.diamond.shape}</p>
                          <p className="text-sm text-muted-foreground">
                            {bid.listing.diamond.caratWeight}ct • {bid.listing.diamond.color}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{bid.bidder.companyName}</p>
                          <p className="text-sm text-muted-foreground">
                            ★ {bid.bidder.averageRating.toFixed(1)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>${bid.listing.askingPrice.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">${bid.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <BidStatusBadge status={bid.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {bid.status === "pending" ? (
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="default">Accept</Button>
                            <Button size="sm" variant="outline">Reject</Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="ghost">View</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deals Tab */}
        <TabsContent value="deals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Deals</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Diamond</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Counterparty</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allUserDeals.map((deal) => {
                    const isBuyer = deal.buyerId === currentUser?.id;
                    const counterparty = isBuyer ? deal.seller : deal.buyer;
                    return (
                      <TableRow key={deal.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium capitalize">{deal.listing.diamond.shape}</p>
                            <p className="text-sm text-muted-foreground">
                              {deal.listing.diamond.caratWeight}ct • {deal.listing.diamond.color}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={isBuyer ? "default" : "secondary"}>
                            {isBuyer ? "Buyer" : "Seller"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{counterparty.companyName}</p>
                            <p className="text-sm text-muted-foreground">
                              ★ {counterparty.averageRating.toFixed(1)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${deal.finalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <DealStatusBadge status={deal.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost">View Details</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
