
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
    <Card className="mb-2 bg-dark-card hover:bg-dark-muted/50 transition-colors">
      <div className="flex border-b dark:border-dark-border">
        {/* Left sidebar with voting */}
        <div className="w-10 bg-muted/20 dark:bg-dark-muted/20 flex flex-col items-center py-2">
          <button 
            onClick={() => setUpvotes(prev => prev + 1)}
            className="text-muted-foreground dark:text-dark-foreground hover:text-primary transition-colors"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium my-1 dark:text-dark-foreground">{upvotes}</span>
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
                <Badge variant="outline" className="px-1.5 py-0.5 text-xs capitalize dark:bg-dark-muted/30">
                  {gig.type}
                </Badge>
              </div>
              <h3 className="text-base font-medium mt-1 dark:text-dark-foreground">{gig.title}</h3>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                Posted by {gig.poster_name} • {format(gig.createdAt, "MMM dd")}
              </p>
            </div>
            <Button
              variant="outline" 
              size="sm"
              className="bg-gig-purple hover:bg-gig-dark-purple text-white"
              disabled={gig.is_closed || getRemainingSpots() === 0}
              onClick={() => onApply(gig.id)}
            >
              {gig.is_closed 
                ? "Closed" 
                : getRemainingSpots() === 0 
                  ? "Full" 
                  : "Join"}
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className={`text-sm text-muted-foreground dark:text-gray-300 ${!isExpanded ? "line-clamp-2" : ""}`}>
              {gig.description}
            </p>
            {gig.description.length > 100 && (
              <button 
                className="text-xs text-gig-purple hover:underline dark:text-gig-light-purple"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 mt-3 text-muted-foreground dark:text-gray-400">
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
              <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white">
                <MessageSquare className="h-3 w-3" />
                <span>Contact</span>
              </button>
              <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white">
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

