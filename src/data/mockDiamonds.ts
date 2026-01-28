import type { Diamond, Listing, InventoryStatus } from "@/types";
import { mockUsers, otherTraders } from "./mockUsers";

// ============================================
// Mock Diamond Inventory Data
// ============================================

const createDiamond = (
  id: string,
  ownerId: string,
  overrides: Partial<Diamond>
): Diamond => ({
  id,
  ownerId,
  shape: "round",
  caratWeight: 1.0,
  color: "F",
  clarity: "VS1",
  cut: "Excellent",
  certification: "GIA",
  certificateNumber: `GIA-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
  polish: "Excellent",
  symmetry: "Excellent",
  fluorescence: "None",
  measurements: "6.5 x 6.5 x 4.0 mm",
  tablePercent: 57,
  depthPercent: 61.5,
  status: "available",
  imageUrls: [],
  createdAt: "2024-01-01T10:00:00Z",
  updatedAt: "2024-01-15T10:00:00Z",
  ...overrides,
});

// Current user's inventory (user-001)
export const mockUserInventory: Diamond[] = [
  createDiamond("diamond-001", "user-001", {
    shape: "round",
    caratWeight: 1.52,
    color: "D",
    clarity: "VVS1",
    cut: "Excellent",
    status: "available",
  }),
  createDiamond("diamond-002", "user-001", {
    shape: "princess",
    caratWeight: 2.01,
    color: "E",
    clarity: "VS2",
    cut: "Very Good",
    status: "listed",
  }),
  createDiamond("diamond-003", "user-001", {
    shape: "cushion",
    caratWeight: 1.75,
    color: "F",
    clarity: "VS1",
    cut: "Excellent",
    status: "locked",
  }),
  createDiamond("diamond-004", "user-001", {
    shape: "oval",
    caratWeight: 0.92,
    color: "G",
    clarity: "SI1",
    cut: "Very Good",
    status: "completed",
  }),
  createDiamond("diamond-005", "user-001", {
    shape: "emerald",
    caratWeight: 2.35,
    color: "D",
    clarity: "IF",
    cut: "Excellent",
    status: "available",
  }),
  createDiamond("diamond-006", "user-001", {
    shape: "pear",
    caratWeight: 1.18,
    color: "E",
    clarity: "VVS2",
    cut: "Excellent",
    status: "available",
  }),
  createDiamond("diamond-007", "user-001", {
    shape: "marquise",
    caratWeight: 1.45,
    color: "F",
    clarity: "VS2",
    cut: "Very Good",
    status: "listed",
  }),
  createDiamond("diamond-008", "user-001", {
    shape: "radiant",
    caratWeight: 1.88,
    color: "G",
    clarity: "VS1",
    cut: "Excellent",
    status: "available",
  }),
];

// Other traders' diamonds (for listings they've created)
export const otherTraderDiamonds: Diamond[] = [
  createDiamond("diamond-t001", "trader-001", {
    shape: "round",
    caratWeight: 2.15,
    color: "D",
    clarity: "FL",
    cut: "Excellent",
    status: "listed",
  }),
  createDiamond("diamond-t002", "trader-001", {
    shape: "oval",
    caratWeight: 1.82,
    color: "E",
    clarity: "VVS1",
    cut: "Excellent",
    status: "listed",
  }),
  createDiamond("diamond-t003", "trader-002", {
    shape: "cushion",
    caratWeight: 3.01,
    color: "F",
    clarity: "VS1",
    cut: "Excellent",
    status: "listed",
  }),
  createDiamond("diamond-t004", "trader-002", {
    shape: "emerald",
    caratWeight: 2.45,
    color: "G",
    clarity: "VVS2",
    cut: "Very Good",
    status: "listed",
  }),
  createDiamond("diamond-t005", "trader-003", {
    shape: "princess",
    caratWeight: 1.95,
    color: "D",
    clarity: "IF",
    cut: "Excellent",
    status: "listed",
  }),
  createDiamond("diamond-t006", "trader-003", {
    shape: "round",
    caratWeight: 1.33,
    color: "E",
    clarity: "VS2",
    cut: "Excellent",
    status: "listed",
  }),
  createDiamond("diamond-t007", "trader-004", {
    shape: "pear",
    caratWeight: 2.22,
    color: "F",
    clarity: "VVS1",
    cut: "Excellent",
    status: "listed",
  }),
  createDiamond("diamond-t008", "trader-004", {
    shape: "radiant",
    caratWeight: 1.68,
    color: "G",
    clarity: "VS1",
    cut: "Very Good",
    status: "listed",
  }),
  createDiamond("diamond-t009", "trader-001", {
    shape: "heart",
    caratWeight: 1.55,
    color: "D",
    clarity: "VVS2",
    cut: "Excellent",
    status: "listed",
  }),
  createDiamond("diamond-t010", "trader-002", {
    shape: "asscher",
    caratWeight: 2.08,
    color: "E",
    clarity: "VS1",
    cut: "Excellent",
    status: "listed",
  }),
];

// ============================================
// Mock Listings Data
// ============================================

const getTraderById = (id: string) => {
  const user = mockUsers.kyc_approved;
  if (user.id === id) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      reputationScore: user.reputationScore,
      averageRating: user.averageRating,
    };
  }
  const trader = otherTraders.find((t) => t.id === id);
  if (trader) {
    return {
      id: trader.id,
      firstName: trader.firstName,
      lastName: trader.lastName,
      companyName: trader.companyName,
      reputationScore: trader.reputationScore,
      averageRating: trader.averageRating,
    };
  }
  return null;
};

const createListing = (
  id: string,
  diamond: Diamond,
  overrides: Partial<Listing>
): Listing => {
  const seller = getTraderById(diamond.ownerId);
  return {
    id,
    diamondId: diamond.id,
    diamond,
    sellerId: diamond.ownerId,
    seller: seller!,
    askingPrice: 10000,
    currency: "USD",
    status: "active",
    viewCount: Math.floor(Math.random() * 500),
    bidCount: Math.floor(Math.random() * 10),
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
    ...overrides,
  };
};

// User's own listings
export const mockUserListings: Listing[] = [
  createListing("listing-001", mockUserInventory[1], {
    askingPrice: 28500,
    bidCount: 4,
    viewCount: 156,
  }),
  createListing("listing-002", mockUserInventory[6], {
    askingPrice: 15800,
    bidCount: 2,
    viewCount: 89,
  }),
];

// Other traders' listings (what user can browse and bid on)
export const otherTradersListings: Listing[] = [
  createListing("listing-t001", otherTraderDiamonds[0], {
    askingPrice: 125000,
    bidCount: 7,
    viewCount: 342,
  }),
  createListing("listing-t002", otherTraderDiamonds[1], {
    askingPrice: 45000,
    bidCount: 3,
    viewCount: 198,
  }),
  createListing("listing-t003", otherTraderDiamonds[2], {
    askingPrice: 78500,
    bidCount: 5,
    viewCount: 267,
  }),
  createListing("listing-t004", otherTraderDiamonds[3], {
    askingPrice: 52000,
    bidCount: 2,
    viewCount: 145,
  }),
  createListing("listing-t005", otherTraderDiamonds[4], {
    askingPrice: 89000,
    bidCount: 6,
    viewCount: 289,
  }),
  createListing("listing-t006", otherTraderDiamonds[5], {
    askingPrice: 21500,
    bidCount: 4,
    viewCount: 178,
  }),
  createListing("listing-t007", otherTraderDiamonds[6], {
    askingPrice: 67000,
    bidCount: 3,
    viewCount: 223,
  }),
  createListing("listing-t008", otherTraderDiamonds[7], {
    askingPrice: 34500,
    bidCount: 1,
    viewCount: 112,
  }),
  createListing("listing-t009", otherTraderDiamonds[8], {
    askingPrice: 55000,
    bidCount: 4,
    viewCount: 201,
  }),
  createListing("listing-t010", otherTraderDiamonds[9], {
    askingPrice: 48000,
    bidCount: 2,
    viewCount: 167,
  }),
];

// All listings combined
export const allListings: Listing[] = [...mockUserListings, ...otherTradersListings];

// Helper to get inventory by status
export const getInventoryByStatus = (status?: InventoryStatus): Diamond[] => {
  if (!status) return mockUserInventory;
  return mockUserInventory.filter((d) => d.status === status);
};

// Helper to get listings excluding own
export const getBrowsableListings = (currentUserId: string): Listing[] => {
  return allListings.filter((l) => l.sellerId !== currentUserId && l.status === "active");
};
