import Logout from "@/components/Logout";
import { createClient } from "@/utils/supabase/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
 
  return (
    <div className=" w-full bg-background p-4 flex items-center justify-center mt-10">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.user_metadata.avatar_url}
                alt="User Avatar"
              />
              <AvatarFallback className="text-2xl font-medium">
                {user?.user_metadata.user_name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-foreground">
                {user?.user_metadata.user_name || "User"}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="pt-2">
              <Logout />
            </div>
          </CardContent>
        </Card>

        {/* Empty Space for Future Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Content</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>Future content will appear here</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>Future activity will appear here</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
