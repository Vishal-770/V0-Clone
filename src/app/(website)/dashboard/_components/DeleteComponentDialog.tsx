import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DeleteComponent } from "@/service/service";
import { toast } from "sonner";
const DeleteComponentDialog = ({
  refetch,
  setSelectedComponentId,
  selectedComponentId,
}: {
  refetch: () => void;
  setSelectedComponentId: (id: string | null) => void;
  selectedComponentId: string | null;
}) => {
  const deleteMutation = useMutation({
    mutationFn: DeleteComponent,
    onSuccess: () => {
      toast.success("Component deleted successfully");
      setSelectedComponentId(null);
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete component");
    },
  });
  const handleDelete = () => {
    if (selectedComponentId) {
      deleteMutation.mutate(selectedComponentId);
    }
  };
  return (
    <>
      <Dialog
        open={!!selectedComponentId}
        onOpenChange={() => setSelectedComponentId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              This action is irreversible. It will permanently delete the
              component and all related data.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setSelectedComponentId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <span className="animate-spin mr-2">↻</span> Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteComponentDialog;
