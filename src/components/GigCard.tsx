
import { Gig } from "@/lib/types";
import { format } from "date-fns";
import { ArrowUpIcon, CalendarIcon, Clock, DollarSign, MapPin, MessageSquare, ShareIcon, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface GigCardProps {
  gig: Gig;
  onApply: (gigId: string) => void;
}

const GigCard = ({ gig, onApply }: GigCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  
  const formatDate = (date: Date) => {
    return format(date, "MMM dd, yyyy 'at' h:mm a");
  };

  const getRemainingSpots = () => {
    return gig.max_needed - gig.applicants_count;
  };

  // Check if poster is an institution (for verified badge)
  const isPosterInstitution = gig.poster_name.includes("University") || 
                             gig.poster_name.includes("College") || 
                             gig.poster_name.includes("Institute") ||
                             gig.poster_name.includes("School");
  
  return (
    <Card className="mb-2 bg-[#1E1E1E] border-[#343536] hover:bg-[#272729] transition-colors">
      <div className="flex border-b border-[#343536]">
        {/* Left sidebar with voting */}
        <div className="w-10 bg-[#1A1A1A]/50 flex flex-col items-center py-2">
          <button 
            onClick={() => setUpvotes(prev => prev + 1)}
            className="text-gray-400 hover:text-gig-purple transition-colors"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium my-1 text-gray-300">{upvotes}</span>
        </div>

        {/* Main content */}
        <div className="flex-1 p-3">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary"
                  className={cn(
                    "px-1.5 py-0.5 text-xs",
                    gig.payment_status === "secured" 
                      ? "bg-green-900/30 text-green-400 hover:bg-green-900/40" 
                      : "bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/40"
                  )}
                >
                  {gig.payment_status === "secured" ? "💰 Secured" : "⚠️ Pending"}
                </Badge>
                <Badge variant="outline" className="px-1.5 py-0.5 text-xs capitalize bg-[#272729] border-[#343536] text-gray-300">
                  {gig.type}
                </Badge>
              </div>
              <div className="flex items-center mt-1">
                <h3 className="text-sm font-medium text-gray-100">{gig.title}</h3>
                {isPosterInstitution && (
                  <CheckCircle className="h-3.5 w-3.5 ml-1.5 text-gig-purple" />
                )}
              </div>
              <p className="text-xs text-gray-400">
                Posted by {gig.poster_name} • {format(gig.createdAt, "MMM dd")}
              </p>
            </div>
            <Button
              variant="secondary" 
              size="sm"
              className="bg-gig-purple text-white hover:bg-gig-dark-purple h-7 text-xs"
              disabled={gig.is_closed || getRemainingSpots() === 0}
              onClick={() => onApply(gig.id)}
            >
              {gig.is_closed 
                ? "Closed" 
                : getRemainingSpots() === 0 
                  ? "Full" 
                  : "Check In"}
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className={`text-xs text-gray-300 ${!isExpanded ? "line-clamp-2" : ""}`}>
              {gig.description}
            </p>
            {gig.description.length > 100 && (
              <button 
                className="text-xs text-gig-purple hover:underline"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 mt-3 text-gray-400 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs">
              <Users className="h-3 w-3" />
              <span>{gig.applicants_count}/{gig.max_needed}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <CalendarIcon className="h-3 w-3" />
              <span>{format(gig.date, "MMM dd")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <MapPin className="h-3 w-3" />
              <span>{gig.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Clock className="h-3 w-3" />
              <span>{gig.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <DollarSign className="h-3 w-3" />
              <span>${gig.payment_amount}</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button className="flex items-center gap-1 text-xs hover:text-gig-purple transition-colors">
                <MessageSquare className="h-3 w-3" />
                <span>Contact</span>
              </button>
              <button className="flex items-center gap-1 text-xs hover:text-gig-purple transition-colors">
                <ShareIcon className="h-3 w-3" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GigCard;
