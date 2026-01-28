import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { User, NotificationSettings } from "@/types";
import type { MockUserType } from "@/config/mockMode";
import { MOCK_MODE, DEFAULT_MOCK_USER } from "@/config/mockMode";
import { mockUsers, mockNotificationSettings } from "@/data/mockUsers";

// ============================================
// Mock Context Types
// ============================================

interface MockContextValue {
  // Mock mode state
  isMockMode: boolean;
  
  // Current mock user
  currentUser: User | null;
  currentUserType: MockUserType;
  setMockUserType: (type: MockUserType) => void;
  
  // Auth simulation
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  
  // Notification settings
  notificationSettings: NotificationSettings | null;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  
  // KYC helpers
  isKYCApproved: boolean;
  canTrade: boolean;
}

const MockContext = createContext<MockContextValue | null>(null);

// ============================================
// Mock Provider Component
// ============================================

interface MockProviderProps {
  children: React.ReactNode;
}

export function MockProvider({ children }: MockProviderProps) {
  const [mockUserType, setMockUserType] = useState<MockUserType>(DEFAULT_MOCK_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Start authenticated in mock mode
  const [notificationSettingsState, setNotificationSettingsState] = useState<NotificationSettings | null>(
    mockNotificationSettings[mockUsers[mockUserType].id] || null
  );

  // Get current user based on mock type
  const currentUser = useMemo(() => {
    if (!MOCK_MODE || !isAuthenticated) return null;
    return mockUsers[mockUserType];
  }, [mockUserType, isAuthenticated]);

  // Update notification settings when user type changes
  const handleSetMockUserType = useCallback((type: MockUserType) => {
    setMockUserType(type);
    const userId = mockUsers[type].id;
    setNotificationSettingsState(mockNotificationSettings[userId] || null);
  }, []);

  // Simulated login
  const login = useCallback(async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // In mock mode, always succeed with any credentials
    if (MOCK_MODE) {
      setIsAuthenticated(true);
      return { success: true };
    }
    
    return { success: false, error: "API not connected" };
  }, []);

  // Logout
  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  // Update notification settings
  const updateNotificationSettings = useCallback((updates: Partial<NotificationSettings>) => {
    setNotificationSettingsState((prev) => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  }, []);

  // Computed helpers
  const isKYCApproved = currentUser?.kycStatus === "approved";
  const canTrade = isKYCApproved && currentUser?.userStatus === "active";

  const value = useMemo<MockContextValue>(
    () => ({
      isMockMode: MOCK_MODE,
      currentUser,
      currentUserType: mockUserType,
      setMockUserType: handleSetMockUserType,
      isAuthenticated,
      login,
      logout,
      notificationSettings: notificationSettingsState,
      updateNotificationSettings,
      isKYCApproved,
      canTrade,
    }),
    [
      currentUser,
      mockUserType,
      handleSetMockUserType,
      isAuthenticated,
      login,
      logout,
      notificationSettingsState,
      updateNotificationSettings,
      isKYCApproved,
      canTrade,
    ]
  );

  return <MockContext.Provider value={value}>{children}</MockContext.Provider>;
}

// ============================================
// Hook to use Mock Context
// ============================================

export function useMock() {
  const context = useContext(MockContext);
  if (!context) {
    throw new Error("useMock must be used within a MockProvider");
  }
  return context;
}

// Re-export types
export type { MockUserType };
