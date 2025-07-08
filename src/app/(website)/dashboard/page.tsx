import { createClient } from "@/utils/supabase/server";
import React from "react";
import DashBoard from "./_components/DashBoard";
import { QueryProvider } from "@/providers/QueryClientProvider";

const Home = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  // console.log(data.user?.email);

  return (
    <QueryProvider>
      {" "}
      <DashBoard email={data.user?.email} />
    </QueryProvider>
  );
};

export default Home;
