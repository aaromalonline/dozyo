
import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { MapPin, Star, ThumbsUp, CheckCircle } from "lucide-react";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="bg-[#1E1E1E] border-[#343536]">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
              <AvatarFallback className="bg-[#272729] text-gray-200">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <CardTitle className="text-base text-gray-200">{user.name}</CardTitle>
                {user.type === "institution" && (
                  <CheckCircle className="h-3.5 w-3.5 ml-1.5 text-gig-purple" />
                )}
              </div>
              <CardDescription className="flex items-center mt-1 text-gray-400">
                <MapPin className="h-3 w-3 mr-1" />
                {user.location}
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`${user.type === "institution" 
              ? "bg-gig-light-purple text-gig-purple border-gig-purple/20" 
              : "bg-[#272729] text-gray-300 border-[#343536]"
            } text-xs px-1.5 truncate max-w-[80px]`}
          >
            {user.type === "institution" ? "Institution" : "Individual"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-gray-300">
        <div className="flex items-center space-x-4 text-xs mt-2">
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
            <span className="font-medium">{user.rating}</span>
            <span className="text-gray-400 ml-1">rating</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="h-3.5 w-3.5 text-gig-purple mr-1" />
            <span className="font-medium">{user.upvotes}</span>
            <span className="text-gray-400 ml-1">upvotes</span>
          </div>
        </div>

        <div className="mt-3">
          <h3 className="text-xs font-medium text-gray-200 mb-1">Contact</h3>
          <p className="text-xs text-gray-400">{user.contact}</p>
        </div>

        <div className="mt-3">
          <h3 className="text-xs font-medium text-gray-200 mb-1">Activity</h3>
          <div className="text-xs text-gray-400">
            <p>Posted {user.history.posted.length} gigs</p>
            <p>Applied to {user.history.applied.length} gigs</p>
            <p>Completed {user.history.completed.length} gigs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
