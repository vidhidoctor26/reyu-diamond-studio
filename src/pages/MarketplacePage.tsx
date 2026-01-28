import { TrendingUp, TrendingDown, Minus, Filter, Search, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { mockMarketReferences } from "@/data/mockChatNotifications";
import type { MarketTrend } from "@/types";

function TrendIcon({ trend }: { trend: MarketTrend }) {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-success" />;
    case "down":
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
}

function TrendBadge({ trend }: { trend: MarketTrend }) {
  const variants: Record<MarketTrend, { className: string; label: string }> = {
    up: { className: "bg-success/10 text-success border-success/30", label: "Rising" },
    down: { className: "bg-destructive/10 text-destructive border-destructive/30", label: "Falling" },
    stable: { className: "bg-muted text-muted-foreground border-muted", label: "Stable" },
  };
  const variant = variants[trend];
  return (
    <Badge variant="outline" className={variant.className}>
      <TrendIcon trend={trend} />
      <span className="ml-1">{variant.label}</span>
    </Badge>
  );
}

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Marketplace Reference</h1>
        <p className="text-muted-foreground mt-1">
          Indicative pricing and market trends for reference only.
        </p>
      </div>

      {/* Important Notice */}
      <Card className="border-info/30 bg-info/5">
        <CardContent className="flex items-start gap-3 p-4">
          <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-info">Reference Only – Not a Trade Offer</p>
            <p className="text-sm text-muted-foreground mt-1">
              Prices shown are indicative market references based on recent transactions. 
              Actual trading prices may vary based on specific stone characteristics and negotiations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by shape, color, clarity..." className="pl-9" />
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
                <SelectItem value="pear">Pear</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colors</SelectItem>
                <SelectItem value="D">D</SelectItem>
                <SelectItem value="E">E</SelectItem>
                <SelectItem value="F">F</SelectItem>
                <SelectItem value="G">G</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Trend" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trends</SelectItem>
                <SelectItem value="up">Rising</SelectItem>
                <SelectItem value="down">Falling</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Market Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Market Reference Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shape</TableHead>
                <TableHead>Carat Range</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Clarity</TableHead>
                <TableHead className="text-right">Indicative Price</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMarketReferences.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium capitalize">{item.shape}</TableCell>
                  <TableCell>
                    {item.caratRange.min} - {item.caratRange.max} ct
                  </TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>{item.clarity}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${item.indicativePrice.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <TrendBadge trend={item.trend} />
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockMarketReferences.filter((m) => m.trend === "up").length}
                </p>
                <p className="text-sm text-muted-foreground">Categories Rising</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Minus className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockMarketReferences.filter((m) => m.trend === "stable").length}
                </p>
                <p className="text-sm text-muted-foreground">Categories Stable</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockMarketReferences.filter((m) => m.trend === "down").length}
                </p>
                <p className="text-sm text-muted-foreground">Categories Falling</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
