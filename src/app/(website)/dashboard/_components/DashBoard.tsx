"use client";

import React, { useState } from "react";
import { FetchComponents, FetchUserDetails } from "@/service/service";

import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateComponentDialog from "./CreateComponentDialog";
import DeleteComponentDialog from "./DeleteComponentDialog";

interface DashBoardProps {
  email?: string;
}

const DashBoard: React.FC<DashBoardProps> = ({ email }) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: () => {
      if (!email) throw new Error("No email provided");
      return FetchUserDetails(email);
    },
    enabled: !!email,
  });

  const {
    data: componentData,
    isError: componentError,
    isLoading: isLoadingComponents,
    refetch,
  } = useQuery({
    queryKey: ["Components", userData?.id],
    queryFn: () => FetchComponents(userData.id),
    enabled: !!userData,
  });

  if (!email) {
    return (
      <Alert className="w-full max-w-4xl mx-auto my-8">
        <Terminal className="h-4 w-4" />
        <AlertTitle>No account detected</AlertTitle>
        <AlertDescription>
          Please sign in to access the dashboard.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading || isLoadingComponents) {
    return (
      <div className="p-8 w-full max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-1/3 rounded" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-48 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || componentError) {
    return (
      <Alert variant="destructive" className="w-full max-w-4xl mx-auto my-8">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {(error as Error).message || "Failed to load data"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full h-full p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {userData?.username}!
            </h1>
            <p className="text-muted-foreground">
              Manage your components and create new ones
            </p>
          </div>
          <CreateComponentDialog refetch={refetch} userData={userData} />
        </div>

        {/* Components */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Components</h2>
            <Badge variant="outline" className="px-3 py-1">
              {componentData?.length || 0} items
            </Badge>
          </div>

          {componentData?.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                You don&#39;t have any components yet. Create your first one!
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {componentData?.map((component, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">
                        {component?.name}
                      </h3>
                      <Badge variant="secondary" className="ml-2">
                        #{index + 1}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono break-all">
                      {component?.componentId}
                    </p>
                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          setSelectedComponentId(component?.componentId)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Delete Dialog */}
      <DeleteComponentDialog
        setSelectedComponentId={setSelectedComponentId}
        selectedComponentId={selectedComponentId}
        refetch={refetch}
      />
    </div>
  );
};

export default DashBoard;
