
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MapPin } from "lucide-react";
import { locations } from "@/data/mockData";

interface LocationSelectorProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

const LocationSelector = ({ currentLocation, onLocationChange }: LocationSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-sm bg-background border-border hover:bg-accent/50"
        >
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>
            {currentLocation === "all" 
              ? "All Locations" 
              : currentLocation
            }
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {locations.map((location) => (
          <DropdownMenuItem 
            key={location.value}
            className={`cursor-pointer ${
              currentLocation === location.value 
                ? 'bg-accent text-accent-foreground font-medium' 
                : ''
            }`}
            onClick={() => onLocationChange(location.value)}
          >
            {location.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocationSelector;
