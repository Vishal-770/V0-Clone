import { createClient } from "@/utils/supabase/client";

import { nanoid } from "nanoid";
const supabase = createClient();

export async function FetchUserDetails(email: string) {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("email", email)
    .single();
  if (data) {
    return data;
  }
  if (error) {
    console.log("Error fecthing user details", error);
    throw new Error("Error Fetching User Details");
  }
}

export async function CreateNewComponent({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  if (!name.trim()) return;
  const componentId = nanoid(6);
  const { error } = await supabase.from("Components").insert([
    {
      id,
      name,
      componentId,
    },
  ]);

  if (error) throw new Error("Failed To Create a Component");
  else return true;
}

export async function FetchComponents(id: number) {
  if (!id) return;
  const { data, error } = await supabase
    .from("Components")
    .select("*")
    .eq("id", id);
  if (error) {
    throw new Error(`Error Fetching Components ${error.message}`);
  } else return data;
}

export async function DeleteComponent(componentId: string): Promise<void> {
  const { error } = await supabase
    .from("Components")
    .delete()
    .eq("componentId", componentId);
  if (error) {
    throw new Error("Failed Deleting Component");
  }
}
