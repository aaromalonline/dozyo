
import { Gig } from "@/lib/types";
import { format } from "date-fns";
import { CalendarIcon, Clock, DollarSign, MapPin, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";

interface GigCardProps {
  gig: Gig;
  onApply: (gigId: string) => void;
}

const GigCard = ({ gig, onApply }: GigCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatDate = (date: Date) => {
    return format(date, "MMM dd, yyyy 'at' h:mm a");
  };

  const getRemainingSpots = () => {
    return gig.max_needed - gig.applicants_count;
  };
  
  return (
    <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{gig.title}</h3>
            <Badge 
              className={gig.payment_status === "secured" 
                ? "bg-gig-secured text-white" 
                : "bg-gig-pending text-white"
              }
            >
              {gig.payment_status === "secured" ? "💰 Payment Secured" : "⚠️ Payment Pending"}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">Posted by {gig.poster_name}</p>
        </div>
        <Badge variant="outline" className="capitalize">
          {gig.type}
        </Badge>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{formatDate(gig.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{gig.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{gig.duration}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-800">${gig.payment_amount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UsersIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {getRemainingSpots()} spot{getRemainingSpots() !== 1 ? 's' : ''} left
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <p className={`text-sm text-gray-700 ${!isExpanded ? "line-clamp-2" : ""}`}>
            {gig.description}
          </p>
          {gig.description.length > 100 && (
            <button 
              className="text-xs text-gig-purple mt-1 hover:underline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
        
        {isExpanded && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-800">Requirements:</h4>
            <p className="text-sm text-gray-700 mt-1">{gig.requirements}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Posted {format(gig.createdAt, "MMM dd")}
        </div>
        
        <Button 
          className="bg-gig-purple hover:bg-gig-dark-purple"
          disabled={gig.is_closed || getRemainingSpots() === 0}
          onClick={() => onApply(gig.id)}
        >
          {gig.is_closed 
            ? "Closed" 
            : getRemainingSpots() === 0 
              ? "Full" 
              : "I'm In!"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GigCard;
