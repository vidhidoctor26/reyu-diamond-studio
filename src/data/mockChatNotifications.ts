import type { ChatConversation, ChatMessage, Notification, MarketReference, DiamondPreference, Advertisement } from "@/types";
import { mockUsers, otherTraders } from "./mockUsers";

// ============================================
// Mock Chat Conversations
// ============================================

export const mockConversations: ChatConversation[] = [
  {
    id: "conv-001",
    participants: [
      { id: "user-001", firstName: "Rajesh", lastName: "Kumar", companyName: "Kumar Diamond Trading Co." },
      { id: "trader-001", firstName: "Vikram", lastName: "Mehta", companyName: "Solitaire Diamonds Ltd" },
    ],
    linkedListingId: "listing-t001",
    unreadCount: 2,
    isArchived: false,
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
  },
  {
    id: "conv-002",
    participants: [
      { id: "user-001", firstName: "Rajesh", lastName: "Kumar", companyName: "Kumar Diamond Trading Co." },
      { id: "trader-002", firstName: "Anjali", lastName: "Desai", companyName: "Brilliant Cuts Inc" },
    ],
    linkedDealId: "deal-b001",
    unreadCount: 0,
    isArchived: false,
    createdAt: "2024-01-16T09:30:00Z",
    updatedAt: "2024-01-18T16:00:00Z",
  },
  {
    id: "conv-003",
    participants: [
      { id: "user-001", firstName: "Rajesh", lastName: "Kumar", companyName: "Kumar Diamond Trading Co." },
      { id: "trader-003", firstName: "Suresh", lastName: "Jain", companyName: "Diamond Palace Trading" },
    ],
    linkedDealId: "deal-s002",
    unreadCount: 1,
    isArchived: false,
    createdAt: "2024-01-18T10:30:00Z",
    updatedAt: "2024-01-19T09:15:00Z",
  },
  {
    id: "conv-004",
    participants: [
      { id: "user-001", firstName: "Rajesh", lastName: "Kumar", companyName: "Kumar Diamond Trading Co." },
      { id: "trader-004", firstName: "Neha", lastName: "Agarwal", companyName: "Precious Gems Co." },
    ],
    linkedListingId: "listing-002",
    unreadCount: 0,
    isArchived: true,
    createdAt: "2024-01-10T14:00:00Z",
    updatedAt: "2024-01-12T11:00:00Z",
  },
];

export const mockMessages: Record<string, ChatMessage[]> = {
  "conv-001": [
    { id: "msg-001-1", conversationId: "conv-001", senderId: "user-001", content: "Hi Vikram, I'm interested in the 2.15 ct round brilliant you have listed.", status: "read", createdAt: "2024-01-17T10:00:00Z" },
    { id: "msg-001-2", conversationId: "conv-001", senderId: "trader-001", content: "Hello Rajesh! Yes, it's a beautiful stone. GIA certified, excellent cut. Would you like more details?", status: "read", createdAt: "2024-01-17T10:15:00Z" },
    { id: "msg-001-3", conversationId: "conv-001", senderId: "user-001", content: "Yes please. Can you share the full certificate and any additional images?", status: "read", createdAt: "2024-01-17T10:30:00Z" },
    { id: "msg-001-4", conversationId: "conv-001", senderId: "trader-001", content: "Of course! I'll send those over shortly. The stone has excellent symmetry and no fluorescence.", status: "read", createdAt: "2024-01-17T11:00:00Z" },
    { id: "msg-001-5", conversationId: "conv-001", senderId: "trader-001", content: "I've placed a bid at $118,000. Let me know if that works for you.", status: "delivered", createdAt: "2024-01-19T11:00:00Z" },
    { id: "msg-001-6", conversationId: "conv-001", senderId: "trader-001", content: "Looking forward to hearing from you!", status: "delivered", createdAt: "2024-01-19T11:30:00Z" },
  ],
  "conv-002": [
    { id: "msg-002-1", conversationId: "conv-002", senderId: "trader-002", content: "Congratulations! Your bid has been accepted.", status: "read", createdAt: "2024-01-16T09:30:00Z" },
    { id: "msg-002-2", conversationId: "conv-002", senderId: "user-001", content: "Thank you! I'll proceed with the payment right away.", status: "read", createdAt: "2024-01-16T10:00:00Z" },
    { id: "msg-002-3", conversationId: "conv-002", senderId: "user-001", content: "Payment completed. The escrow confirmation should be there.", status: "read", createdAt: "2024-01-16T14:45:00Z" },
    { id: "msg-002-4", conversationId: "conv-002", senderId: "trader-002", content: "Confirmed! I'll prepare the shipment today and provide tracking details.", status: "read", createdAt: "2024-01-16T15:30:00Z" },
    { id: "msg-002-5", conversationId: "conv-002", senderId: "trader-002", content: "Any specific shipping instructions or timing preferences?", status: "read", createdAt: "2024-01-18T16:00:00Z" },
  ],
  "conv-003": [
    { id: "msg-003-1", conversationId: "conv-003", senderId: "trader-003", content: "Hi Rajesh, thank you for accepting my bid!", status: "read", createdAt: "2024-01-18T10:30:00Z" },
    { id: "msg-003-2", conversationId: "conv-003", senderId: "user-001", content: "You're welcome, Suresh. It was a fair offer.", status: "read", createdAt: "2024-01-18T10:45:00Z" },
    { id: "msg-003-3", conversationId: "conv-003", senderId: "trader-003", content: "I've completed the payment. Escrow should be confirmed soon.", status: "read", createdAt: "2024-01-18T15:15:00Z" },
    { id: "msg-003-4", conversationId: "conv-003", senderId: "user-001", content: "Received! Shipping tomorrow via Ferrari Group.", status: "read", createdAt: "2024-01-18T16:00:00Z" },
    { id: "msg-003-5", conversationId: "conv-003", senderId: "trader-003", content: "Tracking number received. Looking forward to receiving it!", status: "sent", createdAt: "2024-01-19T09:15:00Z" },
  ],
  "conv-004": [
    { id: "msg-004-1", conversationId: "conv-004", senderId: "trader-004", content: "Hello, is the marquise still available?", status: "read", createdAt: "2024-01-10T14:00:00Z" },
    { id: "msg-004-2", conversationId: "conv-004", senderId: "user-001", content: "Yes, it's available. Let me know if you have questions.", status: "read", createdAt: "2024-01-10T14:30:00Z" },
    { id: "msg-004-3", conversationId: "conv-004", senderId: "trader-004", content: "Thanks for the info. I'll think about it and get back to you.", status: "read", createdAt: "2024-01-12T11:00:00Z" },
  ],
};

// ============================================
// Mock Notifications
// ============================================

export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    userId: "user-001",
    type: "new_bid",
    title: "New Bid Received",
    message: "Diamond Palace Trading placed a bid of $28,000 on your Princess Cut listing",
    linkTo: "/bids/received",
    linkedEntityId: "bid-r003",
    linkedEntityType: "bid",
    isRead: false,
    createdAt: "2024-01-18T09:45:00Z",
  },
  {
    id: "notif-002",
    userId: "user-001",
    type: "deal_update",
    title: "Deal Shipped",
    message: "Your diamond has been shipped via Ferrari Group. Track: FG-2024-91234",
    linkTo: "/deals/deal-s002",
    linkedEntityId: "deal-s002",
    linkedEntityType: "deal",
    isRead: false,
    createdAt: "2024-01-19T09:00:00Z",
  },
  {
    id: "notif-003",
    userId: "user-001",
    type: "payment_update",
    title: "Payment in Escrow",
    message: "Payment of $74,000 for 3.01ct Cushion is now held in escrow",
    linkTo: "/deals/deal-b001",
    linkedEntityId: "deal-b001",
    linkedEntityType: "deal",
    isRead: true,
    createdAt: "2024-01-16T14:35:00Z",
  },
  {
    id: "notif-004",
    userId: "user-001",
    type: "preference_match",
    title: "New Listing Matches Your Preference",
    message: "A new 2.22ct Pear Shape D VVS1 has been listed matching your saved preference",
    linkTo: "/listings/listing-t007",
    linkedEntityId: "listing-t007",
    linkedEntityType: "listing",
    isRead: true,
    createdAt: "2024-01-15T16:00:00Z",
  },
  {
    id: "notif-005",
    userId: "user-001",
    type: "chat_message",
    title: "New Message",
    message: "Vikram Mehta: Looking forward to hearing from you!",
    linkTo: "/chat/conv-001",
    linkedEntityId: "conv-001",
    linkedEntityType: "chat",
    isRead: false,
    createdAt: "2024-01-19T11:30:00Z",
  },
  {
    id: "notif-006",
    userId: "user-001",
    type: "bid_rejected",
    title: "Bid Rejected",
    message: "Your bid of $82,000 on the Princess Cut was declined by the seller",
    linkTo: "/bids/my-bids",
    linkedEntityId: "bid-u003",
    linkedEntityType: "bid",
    isRead: true,
    createdAt: "2024-01-13T11:20:00Z",
  },
  {
    id: "notif-007",
    userId: "user-001",
    type: "deal_update",
    title: "Deal Completed",
    message: "Your purchase of 1.55ct Heart Shape has been completed successfully!",
    linkTo: "/deals/deal-b002",
    linkedEntityId: "deal-b002",
    linkedEntityType: "deal",
    isRead: true,
    createdAt: "2024-01-10T16:00:00Z",
  },
];

// ============================================
// Mock Market Reference Data (Read-Only)
// ============================================

export const mockMarketReferences: MarketReference[] = [
  { id: "mkt-001", shape: "round", caratRange: { min: 1.0, max: 1.5 }, color: "D", clarity: "VVS1", indicativePrice: 18500, currency: "USD", trend: "up", lastUpdated: "2024-01-19T00:00:00Z" },
  { id: "mkt-002", shape: "round", caratRange: { min: 1.5, max: 2.0 }, color: "D", clarity: "VVS1", indicativePrice: 32000, currency: "USD", trend: "up", lastUpdated: "2024-01-19T00:00:00Z" },
  { id: "mkt-003", shape: "round", caratRange: { min: 2.0, max: 3.0 }, color: "D", clarity: "FL", indicativePrice: 85000, currency: "USD", trend: "stable", lastUpdated: "2024-01-19T00:00:00Z" },
  { id: "mkt-004", shape: "princess", caratRange: { min: 1.0, max: 2.0 }, color: "E", clarity: "VS1", indicativePrice: 12500, currency: "USD", trend: "down", lastUpdated: "2024-01-19T00:00:00Z" },
  { id: "mkt-005", shape: "cushion", caratRange: { min: 2.0, max: 3.0 }, color: "F", clarity: "VS1", indicativePrice: 24000, currency: "USD", trend: "up", lastUpdated: "2024-01-19T00:00:00Z" },
  { id: "mkt-006", shape: "oval", caratRange: { min: 1.5, max: 2.0 }, color: "E", clarity: "VVS1", indicativePrice: 28000, currency: "USD", trend: "stable", lastUpdated: "2024-01-19T00:00:00Z" },
  { id: "mkt-007", shape: "emerald", caratRange: { min: 2.0, max: 3.0 }, color: "D", clarity: "IF", indicativePrice: 45000, currency: "USD", trend: "up", lastUpdated: "2024-01-19T00:00:00Z" },
  { id: "mkt-008", shape: "pear", caratRange: { min: 1.5, max: 2.5 }, color: "F", clarity: "VVS1", indicativePrice: 26000, currency: "USD", trend: "down", lastUpdated: "2024-01-19T00:00:00Z" },
];

// ============================================
// Mock Preferences
// ============================================

export const mockPreferences: DiamondPreference[] = [
  {
    id: "pref-001",
    userId: "user-001",
    name: "High-End Rounds",
    shapes: ["round"],
    caratRange: { min: 1.5, max: 3.0 },
    colors: ["D", "E", "F"],
    clarities: ["FL", "IF", "VVS1", "VVS2"],
    priceRange: { min: 30000, max: 150000 },
    certifications: ["GIA"],
    notificationsEnabled: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "pref-002",
    userId: "user-001",
    name: "Fancy Shapes Under $50K",
    shapes: ["oval", "cushion", "pear", "emerald"],
    caratRange: { min: 1.0, max: 2.5 },
    colors: ["D", "E", "F", "G"],
    clarities: ["VVS1", "VVS2", "VS1"],
    priceRange: { min: 15000, max: 50000 },
    certifications: ["GIA", "IGI"],
    notificationsEnabled: true,
    createdAt: "2024-01-05T14:00:00Z",
    updatedAt: "2024-01-10T09:30:00Z",
  },
];

// ============================================
// Mock Advertisements
// ============================================

export const mockAdvertisements: Advertisement[] = [
  {
    id: "ad-001",
    zone: "sidebar",
    imageUrl: "/placeholder.svg",
    linkUrl: "https://example.com/diamond-insurance",
    altText: "Premium Diamond Insurance - Protect Your Investment",
    status: "active",
    impressions: 15420,
    clicks: 342,
    startsAt: "2024-01-01T00:00:00Z",
    expiresAt: "2024-03-31T23:59:59Z",
  },
  {
    id: "ad-002",
    zone: "listings_top",
    imageUrl: "/placeholder.svg",
    linkUrl: "https://example.com/diamond-expo-2024",
    altText: "Diamond Expo 2024 - Register Now",
    status: "active",
    impressions: 28540,
    clicks: 1205,
    startsAt: "2024-01-15T00:00:00Z",
    expiresAt: "2024-02-28T23:59:59Z",
  },
];
