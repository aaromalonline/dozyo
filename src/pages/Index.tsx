
import { useState, useEffect } from "react";
import { gigs as initialGigs, users } from "@/data/mockData";
import { Gig } from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import FilterBar from "@/components/FilterBar";
import LocationSelector from "@/components/LocationSelector";
import UserProfile from "@/components/UserProfile";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [gigs, setGigs] = useState<Gig[]>(initialGigs);
  const [filteredGigs, setFilteredGigs] = useState<Gig[]>(initialGigs);
  const [currentLocation, setCurrentLocation] = useState("all");
  const [filters, setFilters] = useState({
    type: "all",
    location: "all",
    paymentStatus: "all",
    sortBy: "recent"
  });

  // Apply filters and sorting to gigs
  useEffect(() => {
    let result = [...gigs];
    
    // Apply type filter
    if (filters.type !== "all") {
      result = result.filter(gig => gig.type === filters.type);
    }
    
    // Apply location filter
    if (filters.location !== "all") {
      result = result.filter(gig => gig.location === filters.location);
    }
    
    // Apply payment status filter
    if (filters.paymentStatus !== "all") {
      result = result.filter(gig => gig.payment_status === filters.paymentStatus);
    }
    
    // Apply sorting
    if (filters.sortBy === "recent") {
      result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (filters.sortBy === "payment") {
      result.sort((a, b) => b.payment_amount - a.payment_amount);
    } else if (filters.sortBy === "date") {
      result.sort((a, b) => a.date.getTime() - b.date.getTime());
    }
    
    setFilteredGigs(result);
  }, [gigs, filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  // Handle location changes (from the quick location selector)
  const handleLocationChange = (location: string) => {
    setCurrentLocation(location);
    setFilters(prev => ({ ...prev, location }));
  };

  // Handle applying to a gig
  const handleApplyToGig = (gigId: string) => {
    // In a real app, this would send an application to the backend
    // For now, just show a toast message
    toast.success("Application submitted successfully!", {
      description: "The gig poster will contact you soon.",
    });
    
    // Update the gig's applicant count
    setGigs(prev => 
      prev.map(gig => 
        gig.id === gigId 
          ? { 
              ...gig, 
              applicants_count: gig.applicants_count + 1,
              applicant_ids: [...gig.applicant_ids, "current-user"] // In a real app, this would be the current user's ID
            } 
          : gig
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-dark-foreground">Available Gigs</h2>
          <LocationSelector 
            currentLocation={currentLocation}
            onLocationChange={handleLocationChange}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <FilterBar onFilterChange={handleFilterChange} />
            
            {filteredGigs.length > 0 ? (
              filteredGigs.map(gig => (
                <GigCard 
                  key={gig.id} 
                  gig={gig} 
                  onApply={handleApplyToGig}
                />
              ))
            ) : (
              <div className="bg-white dark:bg-dark-card border dark:border-dark-border rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium text-gray-800 dark:text-dark-foreground mb-2">No gigs found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or check back later for new opportunities.
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-card border dark:border-dark-border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 dark:text-dark-foreground mb-3">Featured Gig Posters</h3>
              <div className="space-y-4">
                {users
                  .filter(user => user.type === "institution")
                  .map(user => (
                    <UserProfile key={user.id} user={user} />
                  ))
                }
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-card border dark:border-dark-border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 dark:text-dark-foreground mb-3">How It Works</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-gig-light-purple rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-gig-purple font-medium text-sm">1</span>
                  </div>
                  <p className="text-sm text-gray-700">Browse available gigs in your area</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-gig-light-purple rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-gig-purple font-medium text-sm">2</span>
                  </div>
                  <p className="text-sm text-gray-700">Apply with a single click using "I'm In!"</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-gig-light-purple rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-gig-purple font-medium text-sm">3</span>
                  </div>
                  <p className="text-sm text-gray-700">Get contacted by the gig poster</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-gig-light-purple rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-gig-purple font-medium text-sm">4</span>
                  </div>
                  <p className="text-sm text-gray-700">Complete the gig and get paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
