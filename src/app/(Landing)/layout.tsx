import { NavbarDemo } from "@/components/MainNavBar";

import React, { ReactNode } from "react";

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen w-screen ">
      <NavbarDemo />
      {children}
    </div>
  );
};

export default HomePageLayout;
