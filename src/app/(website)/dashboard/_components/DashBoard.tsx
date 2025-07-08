"use client";

import React, { useState } from "react";
import {
  CreateNewComponent,
  FetchComponents,
  FetchUserDetails,
} from "@/service/service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface DashBoardProps {
  email?: string;
}

interface FormData {
  name: string;
}

const DashBoard: React.FC<DashBoardProps> = ({ email }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

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

  const createComponentMutation = useMutation({
    mutationFn: (name: string) =>
      CreateNewComponent({
        name,
        id: userData?.id,
      }),
    onSuccess: () => {
      setDialogOpen(false);
      toast.success("Created New Component Successfully");
      reset(); // clear form
      refetch(); // refresh list
    },
    onError: () => {
      toast.error("Error Creating New Component");
    },
  });

  const onSubmit = (data: FormData) => {
    if (!userData) return;
    createComponentMutation.mutate(data.name);
  };

  if (!email) return <h1>No account detected</h1>;
  if (isLoading || isLoadingComponents) return <h1>Loading...</h1>;
  if (isError || componentError)
    return <h1>Error: {(error as Error).message}</h1>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {userData?.username}!
      </h1>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Create New Component</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new component</DialogTitle>
            <DialogDescription>
              Enter a name for your new component below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <Input
              placeholder="Component name"
              {...register("name", { required: true })}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isSubmitting || createComponentMutation.isPending}
              >
                {createComponentMutation.isPending ? "Creating..." : "Create"}
              </Button>
              <Button
                type="button"
                className="cursor-pointer"
                variant="destructive"
                onClick={() => {
                  setDialogOpen(false);
                  reset();
                }}
                disabled={isSubmitting || createComponentMutation.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Display all components */}
      <div className="mt-6">
        <h2 className="text-xl font-medium mb-2">Your Components:</h2>
        {componentData?.length === 0 ? (
          <p>No components found.</p>
        ) : (
          <ul className="space-y-2">
            {componentData?.map((component, index) => (
              <li key={index} className="border rounded-lg p-3 bg-gray-100">
                <span className="font-medium">{component?.name}</span>
                <h1>Component ID: {component?.componentId}</h1>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
