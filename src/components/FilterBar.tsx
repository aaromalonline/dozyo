
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
    <div className="bg-[#1E1E1E] border border-[#343536] rounded-md p-4 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="h-4 w-4 mr-2 text-gray-400" />
        <h3 className="font-semibold text-gray-200">Filter Gigs</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Type
          </label>
          <Select 
            value={activeFilters.type} 
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="w-full bg-[#272729] border-[#343536] text-gray-200">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-[#272729] border-[#343536] text-gray-200">
              {gigTypes.map((type) => (
                <SelectItem key={type.value} value={type.value} className="focus:bg-[#343536] focus:text-white">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Location
          </label>
          <Select 
            value={activeFilters.location} 
            onValueChange={(value) => handleFilterChange("location", value)}
          >
            <SelectTrigger className="w-full bg-[#272729] border-[#343536] text-gray-200">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent className="bg-[#272729] border-[#343536] text-gray-200">
              {locations.map((location) => (
                <SelectItem key={location.value} value={location.value} className="focus:bg-[#343536] focus:text-white">
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Payment Status
          </label>
          <Select 
            value={activeFilters.paymentStatus} 
            onValueChange={(value) => handleFilterChange("paymentStatus", value)}
          >
            <SelectTrigger className="w-full bg-[#272729] border-[#343536] text-gray-200">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-[#272729] border-[#343536] text-gray-200">
              <SelectItem value="all" className="focus:bg-[#343536] focus:text-white">All Statuses</SelectItem>
              <SelectItem value="secured" className="focus:bg-[#343536] focus:text-white">Payment Secured</SelectItem>
              <SelectItem value="pending" className="focus:bg-[#343536] focus:text-white">Payment Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Sort By
          </label>
          <Select 
            value={activeFilters.sortBy} 
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger className="w-full bg-[#272729] border-[#343536] text-gray-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#272729] border-[#343536] text-gray-200">
              <SelectItem value="recent" className="focus:bg-[#343536] focus:text-white">Most Recent</SelectItem>
              <SelectItem value="payment" className="focus:bg-[#343536] focus:text-white">Highest Payment</SelectItem>
              <SelectItem value="date" className="focus:bg-[#343536] focus:text-white">Upcoming Date</SelectItem>
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
            className="text-xs bg-[#272729] border-[#343536] text-gray-300 hover:bg-[#343536] hover:text-white"
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
