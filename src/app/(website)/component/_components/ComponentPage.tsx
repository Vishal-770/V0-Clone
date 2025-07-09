"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchComponent } from "@/service/service";

const ComponentPage = ({ id }: { id: string }) => {
  const {
    data: componentData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Component", id],
    queryFn: () => FetchComponent(id),
  });
  if (isLoading) return <h1>Loding</h1>;
  if (isError) return <h1>Error Occured</h1>;
  console.log(componentData);
  return <div>Component {id}</div>;
};

export default ComponentPage;
