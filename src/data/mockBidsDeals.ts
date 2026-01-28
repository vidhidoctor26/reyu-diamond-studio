import type { Bid, Deal, DealTimelineEvent } from "@/types";
import { mockUsers, otherTraders } from "./mockUsers";
import { mockUserListings, otherTradersListings, mockUserInventory, otherTraderDiamonds } from "./mockDiamonds";

// ============================================
// Mock Bids Data
// ============================================

const getTraderPick = (id: string) => {
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

// Bids placed BY the current user on other traders' listings
export const mockUserBids: Bid[] = [
  {
    id: "bid-u001",
    listingId: "listing-t001",
    listing: {
      id: "listing-t001",
      askingPrice: 125000,
      diamond: otherTraderDiamonds[0],
    },
    bidderId: "user-001",
    bidder: getTraderPick("user-001")!,
    amount: 118000,
    currency: "USD",
    note: "Interested in bulk purchase if more available",
    status: "pending",
    createdAt: "2024-01-18T14:30:00Z",
    updatedAt: "2024-01-18T14:30:00Z",
    expiresAt: "2024-01-25T14:30:00Z",
  },
  {
    id: "bid-u002",
    listingId: "listing-t003",
    listing: {
      id: "listing-t003",
      askingPrice: 78500,
      diamond: otherTraderDiamonds[2],
    },
    bidderId: "user-001",
    bidder: getTraderPick("user-001")!,
    amount: 74000,
    currency: "USD",
    status: "accepted",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
    expiresAt: "2024-01-22T10:00:00Z",
  },
  {
    id: "bid-u003",
    listingId: "listing-t005",
    listing: {
      id: "listing-t005",
      askingPrice: 89000,
      diamond: otherTraderDiamonds[4],
    },
    bidderId: "user-001",
    bidder: getTraderPick("user-001")!,
    amount: 82000,
    currency: "USD",
    note: "Ready for immediate payment",
    status: "rejected",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-13T11:20:00Z",
    expiresAt: "2024-01-19T16:45:00Z",
  },
  {
    id: "bid-u004",
    listingId: "listing-t007",
    listing: {
      id: "listing-t007",
      askingPrice: 67000,
      diamond: otherTraderDiamonds[6],
    },
    bidderId: "user-001",
    bidder: getTraderPick("user-001")!,
    amount: 63500,
    currency: "USD",
    status: "pending",
    createdAt: "2024-01-19T09:15:00Z",
    updatedAt: "2024-01-19T09:15:00Z",
    expiresAt: "2024-01-26T09:15:00Z",
  },
];

// Bids received ON the current user's listings (from other traders)
export const mockBidsOnUserListings: Bid[] = [
  {
    id: "bid-r001",
    listingId: "listing-001",
    listing: {
      id: "listing-001",
      askingPrice: 28500,
      diamond: mockUserInventory[1],
    },
    bidderId: "trader-001",
    bidder: getTraderPick("trader-001")!,
    amount: 27000,
    currency: "USD",
    note: "Looking for quality princess cuts",
    status: "pending",
    createdAt: "2024-01-17T11:00:00Z",
    updatedAt: "2024-01-17T11:00:00Z",
    expiresAt: "2024-01-24T11:00:00Z",
  },
  {
    id: "bid-r002",
    listingId: "listing-001",
    listing: {
      id: "listing-001",
      askingPrice: 28500,
      diamond: mockUserInventory[1],
    },
    bidderId: "trader-002",
    bidder: getTraderPick("trader-002")!,
    amount: 26500,
    currency: "USD",
    status: "pending",
    createdAt: "2024-01-16T15:30:00Z",
    updatedAt: "2024-01-16T15:30:00Z",
    expiresAt: "2024-01-23T15:30:00Z",
  },
  {
    id: "bid-r003",
    listingId: "listing-001",
    listing: {
      id: "listing-001",
      askingPrice: 28500,
      diamond: mockUserInventory[1],
    },
    bidderId: "trader-003",
    bidder: getTraderPick("trader-003")!,
    amount: 28000,
    currency: "USD",
    note: "Best offer, ready to close today",
    status: "pending",
    createdAt: "2024-01-18T09:45:00Z",
    updatedAt: "2024-01-18T09:45:00Z",
    expiresAt: "2024-01-25T09:45:00Z",
  },
  {
    id: "bid-r004",
    listingId: "listing-002",
    listing: {
      id: "listing-002",
      askingPrice: 15800,
      diamond: mockUserInventory[6],
    },
    bidderId: "trader-004",
    bidder: getTraderPick("trader-004")!,
    amount: 14500,
    currency: "USD",
    status: "pending",
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z",
    expiresAt: "2024-01-26T10:00:00Z",
  },
  {
    id: "bid-r005",
    listingId: "listing-002",
    listing: {
      id: "listing-002",
      askingPrice: 15800,
      diamond: mockUserInventory[6],
    },
    bidderId: "trader-001",
    bidder: getTraderPick("trader-001")!,
    amount: 15200,
    currency: "USD",
    status: "pending",
    createdAt: "2024-01-18T16:20:00Z",
    updatedAt: "2024-01-18T16:20:00Z",
    expiresAt: "2024-01-25T16:20:00Z",
  },
];

// ============================================
// Mock Deals Data
// ============================================

const createTimelineEvent = (
  dealId: string,
  event: DealTimelineEvent["event"],
  description: string,
  timestamp: string
): DealTimelineEvent => ({
  id: `timeline-${dealId}-${event}`,
  dealId,
  event,
  description,
  timestamp,
});

// Deals where current user is the BUYER
export const mockDealsAsBuyer: Deal[] = [
  {
    id: "deal-b001",
    listingId: "listing-t003",
    listing: otherTradersListings[2],
    bidId: "bid-u002",
    bid: mockUserBids[1],
    buyerId: "user-001",
    buyer: getTraderPick("user-001")!,
    sellerId: "trader-002",
    seller: getTraderPick("trader-002")!,
    finalAmount: 74000,
    currency: "USD",
    status: "in_escrow",
    paymentStatus: "in_escrow",
    timeline: [
      createTimelineEvent("deal-b001", "created", "Deal created from accepted bid", "2024-01-16T09:00:00Z"),
      createTimelineEvent("deal-b001", "payment_pending", "Awaiting payment from buyer", "2024-01-16T09:05:00Z"),
      createTimelineEvent("deal-b001", "payment_received", "Payment received and held in escrow", "2024-01-16T14:30:00Z"),
      createTimelineEvent("deal-b001", "in_escrow", "Funds secured, awaiting shipment", "2024-01-16T14:35:00Z"),
    ],
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T14:35:00Z",
  },
  {
    id: "deal-b002",
    listingId: "listing-t009",
    listing: otherTradersListings[8],
    bidId: "bid-old-001",
    bid: {
      id: "bid-old-001",
      listingId: "listing-t009",
      listing: {
        id: "listing-t009",
        askingPrice: 55000,
        diamond: otherTraderDiamonds[8],
      },
      bidderId: "user-001",
      bidder: getTraderPick("user-001")!,
      amount: 52000,
      currency: "USD",
      status: "accepted",
      createdAt: "2024-01-05T10:00:00Z",
      updatedAt: "2024-01-06T09:00:00Z",
      expiresAt: "2024-01-12T10:00:00Z",
    },
    buyerId: "user-001",
    buyer: getTraderPick("user-001")!,
    sellerId: "trader-001",
    seller: getTraderPick("trader-001")!,
    finalAmount: 52000,
    currency: "USD",
    status: "completed",
    paymentStatus: "released",
    timeline: [
      createTimelineEvent("deal-b002", "created", "Deal created from accepted bid", "2024-01-06T09:00:00Z"),
      createTimelineEvent("deal-b002", "payment_pending", "Awaiting payment from buyer", "2024-01-06T09:05:00Z"),
      createTimelineEvent("deal-b002", "payment_received", "Payment received and held in escrow", "2024-01-06T15:00:00Z"),
      createTimelineEvent("deal-b002", "in_escrow", "Funds secured, awaiting shipment", "2024-01-06T15:05:00Z"),
      createTimelineEvent("deal-b002", "shipped", "Diamond shipped via secure courier", "2024-01-08T10:00:00Z"),
      createTimelineEvent("deal-b002", "delivered", "Diamond delivered and verified", "2024-01-10T14:00:00Z"),
      createTimelineEvent("deal-b002", "completed", "Deal completed successfully", "2024-01-10T16:00:00Z"),
    ],
    shippingInfo: {
      carrier: "Brinks Global Services",
      trackingNumber: "BGS-2024-78542",
      estimatedDelivery: "2024-01-10T12:00:00Z",
      shippedAt: "2024-01-08T10:00:00Z",
      deliveredAt: "2024-01-10T14:00:00Z",
    },
    createdAt: "2024-01-06T09:00:00Z",
    updatedAt: "2024-01-10T16:00:00Z",
    completedAt: "2024-01-10T16:00:00Z",
  },
];

// Deals where current user is the SELLER
export const mockDealsAsSeller: Deal[] = [
  {
    id: "deal-s001",
    listingId: "listing-old-001",
    listing: {
      ...mockUserListings[0],
      id: "listing-old-001",
      status: "completed",
    },
    bidId: "bid-sold-001",
    bid: {
      id: "bid-sold-001",
      listingId: "listing-old-001",
      listing: {
        id: "listing-old-001",
        askingPrice: 32000,
        diamond: mockUserInventory[3],
      },
      bidderId: "trader-003",
      bidder: getTraderPick("trader-003")!,
      amount: 30500,
      currency: "USD",
      status: "accepted",
      createdAt: "2024-01-02T11:00:00Z",
      updatedAt: "2024-01-03T10:00:00Z",
      expiresAt: "2024-01-09T11:00:00Z",
    },
    buyerId: "trader-003",
    buyer: getTraderPick("trader-003")!,
    sellerId: "user-001",
    seller: getTraderPick("user-001")!,
    finalAmount: 30500,
    currency: "USD",
    status: "completed",
    paymentStatus: "released",
    timeline: [
      createTimelineEvent("deal-s001", "created", "Deal created from accepted bid", "2024-01-03T10:00:00Z"),
      createTimelineEvent("deal-s001", "payment_pending", "Awaiting payment from buyer", "2024-01-03T10:05:00Z"),
      createTimelineEvent("deal-s001", "payment_received", "Payment received and held in escrow", "2024-01-03T16:00:00Z"),
      createTimelineEvent("deal-s001", "in_escrow", "Funds secured, awaiting shipment", "2024-01-03T16:05:00Z"),
      createTimelineEvent("deal-s001", "shipped", "Diamond shipped via secure courier", "2024-01-04T09:00:00Z"),
      createTimelineEvent("deal-s001", "delivered", "Diamond delivered and verified", "2024-01-06T11:00:00Z"),
      createTimelineEvent("deal-s001", "completed", "Deal completed successfully", "2024-01-06T14:00:00Z"),
    ],
    shippingInfo: {
      carrier: "Malca-Amit",
      trackingNumber: "MA-2024-45123",
      estimatedDelivery: "2024-01-06T10:00:00Z",
      shippedAt: "2024-01-04T09:00:00Z",
      deliveredAt: "2024-01-06T11:00:00Z",
    },
    createdAt: "2024-01-03T10:00:00Z",
    updatedAt: "2024-01-06T14:00:00Z",
    completedAt: "2024-01-06T14:00:00Z",
  },
  {
    id: "deal-s002",
    listingId: "listing-001",
    listing: {
      ...mockUserListings[0],
      status: "locked",
    },
    bidId: "bid-r003-accepted",
    bid: {
      ...mockBidsOnUserListings[2],
      id: "bid-r003-accepted",
      status: "accepted",
    },
    buyerId: "trader-003",
    buyer: getTraderPick("trader-003")!,
    sellerId: "user-001",
    seller: getTraderPick("user-001")!,
    finalAmount: 28000,
    currency: "USD",
    status: "shipped",
    paymentStatus: "in_escrow",
    timeline: [
      createTimelineEvent("deal-s002", "created", "Deal created from accepted bid", "2024-01-18T10:00:00Z"),
      createTimelineEvent("deal-s002", "payment_pending", "Awaiting payment from buyer", "2024-01-18T10:05:00Z"),
      createTimelineEvent("deal-s002", "payment_received", "Payment received and held in escrow", "2024-01-18T15:00:00Z"),
      createTimelineEvent("deal-s002", "in_escrow", "Funds secured, awaiting shipment", "2024-01-18T15:05:00Z"),
      createTimelineEvent("deal-s002", "shipped", "Diamond shipped via secure courier", "2024-01-19T09:00:00Z"),
    ],
    shippingInfo: {
      carrier: "Ferrari Group",
      trackingNumber: "FG-2024-91234",
      estimatedDelivery: "2024-01-21T12:00:00Z",
      shippedAt: "2024-01-19T09:00:00Z",
    },
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-19T09:00:00Z",
  },
];

// All deals for the current user
export const allUserDeals: Deal[] = [...mockDealsAsBuyer, ...mockDealsAsSeller];
