
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
import { MapPin, Star, ThumbsUp } from "lucide-react";

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
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {user.location}
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={user.type === "institution" 
              ? "bg-gig-light-purple text-gig-purple" 
              : "bg-gray-100"
            }
          >
            {user.type === "institution" ? "Institution" : "Individual"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm mt-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium">{user.rating}</span>
            <span className="text-gray-500 ml-1">rating</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 text-gig-purple mr-1" />
            <span className="font-medium">{user.upvotes}</span>
            <span className="text-gray-500 ml-1">upvotes</span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Contact</h3>
          <p className="text-sm text-gray-600">{user.contact}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Activity</h3>
          <div className="text-sm text-gray-600">
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
