
import { useState } from "react";
import { gigTypes, locations } from "@/data/mockData";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FilterBarProps {
  onFilterChange: (filters: {
    type: string;
    location: string;
    paymentStatus: string;
    sortBy: string;
  }) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [activeFilters, setActiveFilters] = useState({
    type: "all",
    location: "all",
    paymentStatus: "all",
    sortBy: "recent"
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Filter className="h-4 w-4 mr-2 text-gray-500" />
        <h3 className="font-semibold text-gray-800">Filter Gigs</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <Select 
            value={activeFilters.type} 
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {gigTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Select 
            value={activeFilters.location} 
            onValueChange={(value) => handleFilterChange("location", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Status
          </label>
          <Select 
            value={activeFilters.paymentStatus} 
            onValueChange={(value) => handleFilterChange("paymentStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="secured">Payment Secured</SelectItem>
              <SelectItem value="pending">Payment Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <Select 
            value={activeFilters.sortBy} 
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="payment">Highest Payment</SelectItem>
              <SelectItem value="date">Upcoming Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2 mt-4">
        {activeFilters.type !== "all" && (
          <Badge variant="secondary" className="bg-gig-light-purple text-gig-purple">
            Type: {gigTypes.find(t => t.value === activeFilters.type)?.label}
          </Badge>
        )}
        {activeFilters.location !== "all" && (
          <Badge variant="secondary" className="bg-gig-light-purple text-gig-purple">
            Location: {locations.find(l => l.value === activeFilters.location)?.label}
          </Badge>
        )}
        {activeFilters.paymentStatus !== "all" && (
          <Badge variant="secondary" className="bg-gig-light-purple text-gig-purple">
            Status: {activeFilters.paymentStatus === "secured" ? "Payment Secured" : "Payment Pending"}
          </Badge>
        )}
        
        {(activeFilters.type !== "all" || 
          activeFilters.location !== "all" || 
          activeFilters.paymentStatus !== "all") && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => {
              const resetFilters = {
                type: "all",
                location: "all",
                paymentStatus: "all",
                sortBy: activeFilters.sortBy
              };
              setActiveFilters(resetFilters);
              onFilterChange(resetFilters);
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
