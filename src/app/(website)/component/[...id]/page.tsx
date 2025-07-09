import { QueryProvider } from "@/providers/QueryClientProvider";
import ComponentPage from "../_components/ComponentPage";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const params1 = await params;
  const id = params1.id;

  return (
    <>
      <QueryProvider>
        <ComponentPage id={id} />
      </QueryProvider>
    </>
  );
};

export default page;
