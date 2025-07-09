import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

type Component = {
  name?: string;
  componentId?: string;
};

const ComponentsList = ({
  componentData,
  setSelectedComponentId,
}: {
  componentData: Component[];
  setSelectedComponentId: (id?: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {componentData?.map((component, index) => (
        <Card key={index} className="p-6 hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{component?.name}</h3>
              <Badge variant="secondary" className="ml-2">
                #{index + 1}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground font-mono break-all">
              {component?.componentId}
            </p>
            <div className="flex justify-end gap-2">
              <Link href={`/component/${component.componentId}`}>
                {" "}
                <Button variant="outline" size="sm">
                  Open
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setSelectedComponentId(component?.componentId)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ComponentsList;
