"use client";
import { signOut } from "@/actions/auth";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogout}>
      <Button
        variant="outline"
        className="w-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing out...
          </>
        ) : (
          "Sign out"
        )}
      </Button>
    </form>
  );
};

export default Logout;
