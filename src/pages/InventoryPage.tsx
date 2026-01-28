import { useState } from "react";
import { Package, Plus, Search, Filter, QrCode, Eye, ExternalLink, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockUserInventory } from "@/data/mockDiamonds";
import { useMock } from "@/contexts/MockContext";
import type { InventoryStatus } from "@/types";

// Status badge component
function StatusBadge({ status }: { status: InventoryStatus }) {
  const variants: Record<InventoryStatus, { className: string; label: string }> = {
    available: { className: "status-available border", label: "Available" },
    listed: { className: "status-listed border", label: "Listed" },
    locked: { className: "status-locked border", label: "Locked" },
    completed: { className: "status-completed border", label: "Completed" },
  };
  const variant = variants[status];
  return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>;
}

// Action button based on status
function InventoryAction({ status, diamondId }: { status: InventoryStatus; diamondId: string }) {
  const { canTrade } = useMock();

  switch (status) {
    case "available":
      return (
        <Button size="sm" disabled={!canTrade}>
          <Plus className="h-3 w-3 mr-1" />
          Create Listing
        </Button>
      );
    case "listed":
      return (
        <Button size="sm" variant="outline">
          <Eye className="h-3 w-3 mr-1" />
          View Listing
        </Button>
      );
    case "locked":
      return (
        <Button size="sm" variant="ghost" disabled>
          <Lock className="h-3 w-3 mr-1" />
          In Deal
        </Button>
      );
    case "completed":
      return (
        <Button size="sm" variant="ghost">
          <ExternalLink className="h-3 w-3 mr-1" />
          View Deal
        </Button>
      );
    default:
      return null;
  }
}

export default function InventoryPage() {
  const { canTrade } = useMock();
  const [activeTab, setActiveTab] = useState<string>("all");

  // Filter inventory based on tab
  const filteredInventory = activeTab === "all" 
    ? mockUserInventory 
    : mockUserInventory.filter((d) => d.status === activeTab);

  // Stats
  const stats = {
    total: mockUserInventory.length,
    available: mockUserInventory.filter((d) => d.status === "available").length,
    listed: mockUserInventory.filter((d) => d.status === "listed").length,
    locked: mockUserInventory.filter((d) => d.status === "locked").length,
    completed: mockUserInventory.filter((d) => d.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1>Inventory</h1>
          <p className="text-muted-foreground mt-1">
            Manage your diamond inventory and create listings.
          </p>
        </div>
        <Button disabled={!canTrade}>
          <QrCode className="h-4 w-4 mr-2" />
          Scan Barcode
        </Button>
      </div>

      {/* Trading Restriction Notice */}
      {!canTrade && (
        <Card className="border-warning/30 bg-warning/10">
          <CardContent className="flex items-center gap-3 p-4">
            <Lock className="h-5 w-5 text-warning shrink-0" />
            <p className="text-sm text-warning">
              <strong>Trading Restricted:</strong> Complete your KYC verification to create listings and manage inventory.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-status-available">{stats.available}</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-status-listed">{stats.listed}</p>
            <p className="text-sm text-muted-foreground">Listed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-status-locked">{stats.locked}</p>
            <p className="text-sm text-muted-foreground">Locked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-status-completed">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by certificate, shape..." className="pl-9" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shapes</SelectItem>
                <SelectItem value="round">Round</SelectItem>
                <SelectItem value="princess">Princess</SelectItem>
                <SelectItem value="cushion">Cushion</SelectItem>
                <SelectItem value="oval">Oval</SelectItem>
                <SelectItem value="emerald">Emerald</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="available">Available ({stats.available})</TabsTrigger>
          <TabsTrigger value="listed">Listed ({stats.listed})</TabsTrigger>
          <TabsTrigger value="locked">Locked ({stats.locked})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardContent className="p-0">
              {filteredInventory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium">No items found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activeTab === "all" 
                      ? "Your inventory is empty. Scan a barcode to add items."
                      : `No ${activeTab} items in your inventory.`
                    }
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shape</TableHead>
                      <TableHead>Carat</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead>Clarity</TableHead>
                      <TableHead>Cut</TableHead>
                      <TableHead>Cert</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((diamond) => (
                      <TableRow key={diamond.id}>
                        <TableCell className="font-medium capitalize">{diamond.shape}</TableCell>
                        <TableCell>{diamond.caratWeight}</TableCell>
                        <TableCell>{diamond.color}</TableCell>
                        <TableCell>{diamond.clarity}</TableCell>
                        <TableCell>{diamond.cut}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{diamond.certification}</Badge>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={diamond.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <InventoryAction status={diamond.status} diamondId={diamond.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
