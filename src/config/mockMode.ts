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
  | "suspended";

/**
 * Default mock user type on app load
 */
export const DEFAULT_MOCK_USER: MockUserType = "kyc_approved";

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
