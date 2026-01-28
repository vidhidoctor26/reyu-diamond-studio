import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { KYCBanner } from "./KYCBanner";
import { useMock } from "@/contexts/MockContext";

export function AppLayout() {
  const { currentUser, isAuthenticated } = useMock();

  // If not authenticated, just render the outlet (login/register pages)
  if (!isAuthenticated || !currentUser) {
    return <Outlet />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <AppHeader />
          <KYCBanner />
          <main className="flex-1 overflow-auto">
            <div className="container py-6">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
