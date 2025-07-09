"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CreateNewComponent } from "@/service/service";
import { useMutation } from "@tanstack/react-query";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface userDetails {
  email: string;
  username: string;
  id: number;
  ProfileUrl: string;
}
interface FormData {
  name: string;
}
const CreateComponentDialog = ({
  refetch,
  userData,
}: {
  refetch: () => void;
  userData: userDetails;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });
  const createComponentMutation = useMutation({
    mutationFn: (name: string) =>
      CreateNewComponent({
        name,
        id: userData?.id,
      }),
    onSuccess: () => {
      setDialogOpen(false);
      toast.success("Component created successfully");
      reset();
      refetch();
    },
    onError: () => {
      toast.error("Error creating component");
    },
  });
  const onSubmit = (data: FormData) => {
    if (!userData) return;
    createComponentMutation.mutate(data.name);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Create New Component</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new component</DialogTitle>
          <DialogDescription>
            Give your component a descriptive name to get started.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Component name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setDialogOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || createComponentMutation.isPending}
            >
              {createComponentMutation.isPending ? (
                <>
                  <span className="animate-spin mr-2">↻</span>
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateComponentDialog;
