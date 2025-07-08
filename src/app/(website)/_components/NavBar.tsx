import { User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/modetoggle";
import { createClient } from "@/utils/supabase/server";

const NavBar = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const avatar_url: string | undefined = data.user?.user_metadata?.avatar_url;
  const avatar_fallback: string | undefined =
    data.user?.user_metadata?.name?.[0];
  return (
    <nav className="flex items-center justify-between p-4">
      <SidebarTrigger />
      <div className="flex items-center gap-4 ">
        <Link href="/">Dashboard</Link>
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={avatar_url} />
              <AvatarFallback>{avatar_fallback}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              {" "}
              <DropdownMenuItem>
                <span>
                  <User />
                </span>
                Profile{" "}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;
