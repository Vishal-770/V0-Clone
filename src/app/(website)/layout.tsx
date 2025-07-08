import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AppSidebar } from "./_components/SideBar";
import NavBar from "./_components/NavBar";
import { Toaster } from "@/components/ui/sonner";
export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {" "}
      <SidebarProvider>
        <AppSidebar />

        <main className="w-full">
          <NavBar />
          <div className="px-4"> {children}</div>
        </main>
        <Toaster />
      </SidebarProvider>
    </>
  );
}
