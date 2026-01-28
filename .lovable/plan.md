

# Reyu Diamond App - Implementation Plan

## Overview
A **unified-user diamond trading platform** built with ReactJS, featuring a modern & minimal design aesthetic. Users can seamlessly act as buyers or sellers based on context, with full static/mock data mode for UI testing and stakeholder review.

---

## Design System

### Visual Identity
- **Style**: Modern & Minimal (Apple-inspired)
- **Color Palette**: Neutral grays, soft whites, subtle accent color for CTAs
- **Typography**: Clean sans-serif fonts with strong hierarchy
- **Layout**: Desktop-first responsive design with generous whitespace
- **Components**: Card-based layouts, subtle shadows, rounded corners

---

## Core Infrastructure

### Mock Mode System
- Global `MOCK_MODE` toggle for static/API data switching
- Mock user switcher (dropdown) to test different states:
  - KYC Pending User
  - KYC Approved User
  - Rejected/Suspended User
- Central mock data provider with realistic diamond data
- All routes accessible regardless of mock user state

### App Shell & Navigation
- Sidebar navigation (collapsible) for desktop
- Top header with user profile, notifications bell, and search
- Main navigation modules:
  - Listings (Home)
  - Marketplace
  - Inventory
  - Bids & Deals
  - Chat
  - Notifications
  - Profile

---

## Module Breakdown

### 1. Authentication & KYC Flow
**Screens:**
- Registration (unified, no role selection)
- Login with state handling (pending, rejected, suspended)
- KYC Upload with document submission
- KYC Status banner (persistent until approved)

**States:** Pending → Under Review → Approved/Rejected

---

### 2. Profile Module
**Screens:**
- Profile overview with personal & business details
- KYC status badge
- Reputation score & completed deals counter
- Notification settings page (category toggles)

---

### 3. Marketplace (Read-Only)
**Screens:**
- Reference listings grid/list view
- Advanced filters (shape, carat, colour, clarity, price)
- Detail view with indicative pricing
- "Reference Only – Not a Trade Offer" label

---

### 4. Preferences Module (Private)
**Screens:**
- Create/Edit preference form
- Preference list with quick actions
- Used for notification matching (no trading actions)

---

### 5. Inventory Module
**Screens:**
- Inventory list with status badges (Available, Listed, Locked, Completed)
- Barcode scanner UI (camera integration)
- Inventory detail with contextual actions:
  - Available → "Create Listing" button
  - Listed → View linked listing
  - Locked/Completed → Read-only

---

### 6. Listings Module (Selling Context)
**Screens:**
- Create listing flow (from inventory)
- My listings grid with status
- Listing detail (owner view):
  - View all received bids
  - Accept/Reject bid actions
  - Locked state after acceptance

---

### 7. Bidding Module (Buying Context)
**Screens:**
- Browse listings (excludes own)
- Place bid modal with amount & note
- My bids list (Pending, Accepted, Rejected, Cancelled)
- Bids on my listings view (bidder identities masked)

**Validation:** "Place Bid" disabled on own listings

---

### 8. Deal Management
**Screens:**
- Deals list with buyer/seller context
- Deal detail page with:
  - Linked listing & bid info
  - Status timeline visualization
  - PDF download option
- Deal states: Created → Payment Pending → In Escrow → Shipped → Delivered → Completed (or Disputed/Cancelled)

---

### 9. Escrow & Payment UI
**Screens:**
- Payment initiation (buyer view)
- Payment status display (Pending, In Escrow, Released, Refunded)
- Dispute raise modal (for eligible deals)

---

### 10. Chat Module
**Screens:**
- Conversation list (active & archived)
- Chat thread with:
  - Context label (linked to listing/deal)
  - Message timestamps
  - Sent/Delivered/Read indicators (static display)
- Static pre-filled conversations for testing

---

### 11. Notifications
**Screens:**
- Notification center (sorted by latest)
- Read/unread states with click navigation
- Types: Preference match, bids, deals, payments, chat, admin

---

### 12. Ratings & Reputation
**Features:**
- Rating submission after deal completion
- Star rating + optional feedback
- Profile display: average rating, badges, deal count

---

### 13. Advertisements
- Ad zones in approved locations only
- Non-intrusive (never during bidding/payment/disputes)
- Hidden containers when no ads exist

---

## UI States & Edge Cases

### Every screen will include:
- Loading skeletons
- Empty state illustrations
- Permission-blocked messages (e.g., "Complete KYC to trade")
- Error handling with retry options
- Disabled action states with tooltip explanations

---

## Mock Data Coverage

Pre-populated data for testing all scenarios:
- 20+ diamond listings (various specs)
- Multiple inventory items in each status
- Bids in all states
- Deals across the entire lifecycle
- Chat conversations with message history
- Notification samples of each type

---

## Phase Summary

| Phase | Modules | Purpose |
|-------|---------|---------|
| **Foundation** | App Shell, Navigation, Mock System, Auth/KYC | Core infrastructure |
| **Core Trading** | Inventory, Listings, Bidding, Deals | Main business flows |
| **Communication** | Chat, Notifications | User engagement |
| **Supporting** | Profile, Preferences, Ratings, Marketplace | Complete experience |
| **Polish** | Ads, Edge cases, Final responsive testing | Production readiness |

---

## Deliverables
- Complete ReactJS application with all routes navigable
- Mock data provider with user state switcher
- Modern, minimal responsive UI
- Component library built on shadcn/ui
- Ready for backend integration when APIs are available

