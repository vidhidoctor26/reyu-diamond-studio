// ============================================
// Mock Mode Configuration
// ============================================

/**
 * Global flag to enable/disable mock mode.
 * When true, the app uses static mock data instead of API calls.
 * When false, the app uses real API endpoints.
 */
export const MOCK_MODE = true;

/**
 * Mock user types for testing different scenarios
 */
export type MockUserType = 
  | "kyc_pending"
  | "kyc_approved" 
  | "kyc_rejected"
  | "suspended"
  | "admin";

/**
 * Default mock user type on app load
 */
export const DEFAULT_MOCK_USER: MockUserType = "kyc_approved";

/**
 * Labels for the mock user switcher dropdown
 */
export const MOCK_USER_LABELS: Record<MockUserType, string> = {
  kyc_approved: "KYC Approved User",
  kyc_pending: "KYC Pending User",
  kyc_rejected: "KYC Rejected User",
  suspended: "Suspended User",
  admin: "Admin User",
};

/**
 * Descriptions for each mock user type
 */
export const MOCK_USER_DESCRIPTIONS: Record<MockUserType, string> = {
  kyc_approved: "Full trading access, can list and bid",
  kyc_pending: "Limited access, awaiting verification",
  kyc_rejected: "KYC rejected, needs to resubmit",
  suspended: "Account suspended, no trading access",
  admin: "Platform administrator with full access",
};

/**
 * Simulated API delay in milliseconds (for realistic loading states)
 */
export const MOCK_API_DELAY = 500;

/**
 * Helper to simulate async API delay
 */
export const simulateApiDelay = async (customDelay?: number): Promise<void> => {
  if (MOCK_MODE) {
    await new Promise((resolve) => 
      setTimeout(resolve, customDelay ?? MOCK_API_DELAY)
    );
  }
};
