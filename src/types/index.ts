// ============================================
// Reyu Diamond App - Core Type Definitions
// ============================================

// ==================== User & Auth ====================

export type KYCStatus = "pending" | "under_review" | "approved" | "rejected";
export type UserStatus = "active" | "suspended" | "pending_verification";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName?: string;
  companyAddress?: string;
  kycStatus: KYCStatus;
  userStatus: UserStatus;
  reputationScore: number;
  completedDeals: number;
  averageRating: number;
  totalRatings: number;
  createdAt: string;
  updatedAt: string;
}

export interface KYCDocument {
  id: string;
  userId: string;
  documentType: "id_proof" | "address_proof" | "business_license" | "tax_document";
  fileName: string;
  uploadedAt: string;
  status: "pending" | "verified" | "rejected";
  rejectionReason?: string;
}

// ==================== Diamond & Inventory ====================

export type DiamondShape =
  | "round"
  | "princess"
  | "cushion"
  | "oval"
  | "emerald"
  | "pear"
  | "marquise"
  | "radiant"
  | "asscher"
  | "heart";

export type DiamondColor = "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M";
export type DiamondClarity = "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1" | "SI2" | "I1" | "I2" | "I3";
export type DiamondCut = "Excellent" | "Very Good" | "Good" | "Fair" | "Poor";
export type CertificationLab = "GIA" | "IGI" | "AGS" | "HRD" | "EGL";

export type InventoryStatus = "available" | "listed" | "locked" | "completed";

export interface Diamond {
  id: string;
  ownerId: string;
  shape: DiamondShape;
  caratWeight: number;
  color: DiamondColor;
  clarity: DiamondClarity;
  cut: DiamondCut;
  certification: CertificationLab;
  certificateNumber: string;
  polish: DiamondCut;
  symmetry: DiamondCut;
  fluorescence: "None" | "Faint" | "Medium" | "Strong" | "Very Strong";
  measurements: string;
  tablePercent: number;
  depthPercent: number;
  status: InventoryStatus;
  barcodeId?: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

// ==================== Listings ====================

export type ListingStatus = "active" | "locked" | "completed" | "cancelled";

export interface Listing {
  id: string;
  diamondId: string;
  diamond: Diamond;
  sellerId: string;
  seller: Pick<User, "id" | "firstName" | "lastName" | "companyName" | "reputationScore" | "averageRating">;
  askingPrice: number;
  currency: "USD" | "EUR" | "GBP" | "INR";
  description?: string;
  status: ListingStatus;
  viewCount: number;
  bidCount: number;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

// ==================== Marketplace (Read-Only Reference) ====================

export type MarketTrend = "up" | "down" | "stable";

export interface MarketReference {
  id: string;
  shape: DiamondShape;
  caratRange: { min: number; max: number };
  color: DiamondColor;
  clarity: DiamondClarity;
  indicativePrice: number;
  currency: "USD";
  trend: MarketTrend;
  lastUpdated: string;
}

// ==================== Preferences ====================

export interface DiamondPreference {
  id: string;
  userId: string;
  name: string;
  shapes: DiamondShape[];
  caratRange: { min: number; max: number };
  colors: DiamondColor[];
  clarities: DiamondClarity[];
  priceRange: { min: number; max: number };
  certifications: CertificationLab[];
  notificationsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== Bidding ====================

export type BidStatus = "pending" | "accepted" | "rejected" | "cancelled" | "expired";

export interface Bid {
  id: string;
  listingId: string;
  listing: Pick<Listing, "id" | "askingPrice" | "diamond">;
  bidderId: string;
  bidder: Pick<User, "id" | "firstName" | "lastName" | "companyName" | "reputationScore" | "averageRating">;
  amount: number;
  currency: "USD" | "EUR" | "GBP" | "INR";
  note?: string;
  status: BidStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

// ==================== Deals ====================

export type DealStatus =
  | "created"
  | "payment_pending"
  | "in_escrow"
  | "shipped"
  | "delivered"
  | "completed"
  | "disputed"
  | "cancelled";

export type PaymentStatus = "pending" | "in_escrow" | "released" | "refunded";

export interface Deal {
  id: string;
  listingId: string;
  listing: Listing;
  bidId: string;
  bid: Bid;
  buyerId: string;
  buyer: Pick<User, "id" | "firstName" | "lastName" | "companyName" | "reputationScore" | "averageRating">;
  sellerId: string;
  seller: Pick<User, "id" | "firstName" | "lastName" | "companyName" | "reputationScore" | "averageRating">;
  finalAmount: number;
  currency: "USD" | "EUR" | "GBP" | "INR";
  status: DealStatus;
  paymentStatus: PaymentStatus;
  timeline: DealTimelineEvent[];
  shippingInfo?: ShippingInfo;
  disputeInfo?: DisputeInfo;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface DealTimelineEvent {
  id: string;
  dealId: string;
  event: DealStatus | "payment_received" | "dispute_raised" | "dispute_resolved";
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ShippingInfo {
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  shippedAt: string;
  deliveredAt?: string;
}

export interface DisputeInfo {
  id: string;
  raisedBy: "buyer" | "seller";
  reason: string;
  description: string;
  status: "open" | "under_review" | "resolved" | "escalated";
  resolution?: string;
  raisedAt: string;
  resolvedAt?: string;
}

// ==================== Chat ====================

export type MessageStatus = "sent" | "delivered" | "read";

export interface ChatConversation {
  id: string;
  participants: Pick<User, "id" | "firstName" | "lastName" | "companyName">[];
  linkedListingId?: string;
  linkedDealId?: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  status: MessageStatus;
  createdAt: string;
}

// ==================== Notifications ====================

export type NotificationType =
  | "preference_match"
  | "new_bid"
  | "bid_accepted"
  | "bid_rejected"
  | "deal_update"
  | "payment_update"
  | "chat_message"
  | "admin_message"
  | "kyc_update";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  linkTo?: string;
  linkedEntityId?: string;
  linkedEntityType?: "listing" | "bid" | "deal" | "chat";
  isRead: boolean;
  createdAt: string;
}

export interface NotificationSettings {
  userId: string;
  listings: boolean;
  bids: boolean;
  deals: boolean;
  payments: boolean;
  chat: boolean;
  system: boolean;
}

// ==================== Ratings ====================

export interface Rating {
  id: string;
  dealId: string;
  raterId: string;
  ratedUserId: string;
  score: 1 | 2 | 3 | 4 | 5;
  feedback?: string;
  createdAt: string;
}

// ==================== Advertisements ====================

export type AdZone = "sidebar" | "listings_top" | "listings_bottom" | "marketplace";
export type AdStatus = "active" | "expired" | "disabled";

export interface Advertisement {
  id: string;
  zone: AdZone;
  imageUrl: string;
  linkUrl: string;
  altText: string;
  status: AdStatus;
  impressions: number;
  clicks: number;
  startsAt: string;
  expiresAt: string;
}
