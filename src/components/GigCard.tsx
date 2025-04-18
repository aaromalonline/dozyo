
import { Gig } from "@/lib/types";
import { format } from "date-fns";
import { ArrowUpIcon, CalendarIcon, Clock, DollarSign, MapPin, MessageSquare, ShareIcon } from "lucide-react";
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
  
  return (
    <Card className="mb-2 hover:bg-accent/50 transition-colors dark:hover:bg-accent/20">
      <div className="flex">
        {/* Left sidebar with voting */}
        <div className="w-10 bg-muted/20 flex flex-col items-center py-2 dark:bg-muted/5">
          <button 
            onClick={() => setUpvotes(prev => prev + 1)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium my-1">{upvotes}</span>
        </div>

        {/* Main content */}
        <div className="flex-1 p-3">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <Badge 
                  className={cn(
                    "px-1.5 py-0.5 text-xs",
                    gig.payment_status === "secured" 
                      ? "bg-gig-secured/20 text-gig-secured hover:bg-gig-secured/30" 
                      : "bg-gig-pending/20 text-gig-pending hover:bg-gig-pending/30"
                  )}
                >
                  {gig.payment_status === "secured" ? "💰 Secured" : "⚠️ Pending"}
                </Badge>
                <Badge variant="outline" className="px-1.5 py-0.5 text-xs capitalize">
                  {gig.type}
                </Badge>
              </div>
              <h3 className="text-base font-medium mt-1">{gig.title}</h3>
              <p className="text-xs text-muted-foreground">
                Posted by {gig.poster_name} • {format(gig.createdAt, "MMM dd")}
              </p>
            </div>
            <Button
              variant="outline" 
              size="sm"
              className="bg-gig-purple hover:bg-gig-dark-purple text-white dark:bg-gig-purple/80 dark:hover:bg-gig-dark-purple/80"
              disabled={gig.is_closed || getRemainingSpots() === 0}
              onClick={() => onApply(gig.id)}
            >
              {gig.is_closed 
                ? "Closed" 
                : getRemainingSpots() === 0 
                  ? "Full" 
                  : "I'm In!"}
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className={`text-sm text-muted-foreground ${!isExpanded ? "line-clamp-2" : ""}`}>
              {gig.description}
            </p>
            {gig.description.length > 100 && (
              <button 
                className="text-xs text-gig-purple hover:underline dark:text-gig-purple/80"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 mt-3 text-muted-foreground">
            <div className="flex items-center gap-1.5 text-xs">
              <CalendarIcon className="h-3 w-3" />
              <span>{formatDate(gig.date)}</span>
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
              <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                <MessageSquare className="h-3 w-3" />
                <span>Contact</span>
              </button>
              <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
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
