"use client";

import { useState } from "react";
import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";

export default function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogout}>
      <Button variant={"ghost"} type="submit" disabled={loading} asChild>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Logging out...
          </>
        ) : (
          <>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </>
        )}
      </Button>
    </form>
  );
}
