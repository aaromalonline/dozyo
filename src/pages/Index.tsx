import { useState, useEffect } from "react";
import { gigs as initialGigs, users } from "@/data/mockData";
import { Gig } from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import FilterBar from "@/components/FilterBar";
import LocationSelector from "@/components/LocationSelector";
import UserProfile from "@/components/UserProfile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
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

  useEffect(() => {
    let result = [...gigs];
    
    if (filters.type !== "all") {
      result = result.filter(gig => gig.type === filters.type);
    }
    
    if (filters.location !== "all") {
      result = result.filter(gig => gig.location === filters.location);
    }
    
    if (filters.paymentStatus !== "all") {
      result = result.filter(gig => gig.payment_status === filters.paymentStatus);
    }
    
    if (filters.sortBy === "recent") {
      result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (filters.sortBy === "payment") {
      result.sort((a, b) => b.payment_amount - a.payment_amount);
    } else if (filters.sortBy === "date") {
      result.sort((a, b) => a.date.getTime() - b.date.getTime());
    }
    
    setFilteredGigs(result);
  }, [gigs, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleLocationChange = (location: string) => {
    setCurrentLocation(location);
    setFilters(prev => ({ ...prev, location }));
  };

  const handleApplyToGig = (gigId: string) => {
    toast.success("Application submitted successfully!", {
      description: "The gig poster will contact you soon.",
    });
    
    setGigs(prev => 
      prev.map(gig => 
        gig.id === gigId 
          ? { 
              ...gig, 
              applicants_count: gig.applicants_count + 1,
              applicant_ids: [...gig.applicant_ids, "current-user"]
            } 
          : gig
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <SidebarProvider>
          <div className="flex w-full">
            <AppSidebar />
            <main className="flex-1 p-4">
              <div className="w-80 min-h-[calc(100vh-3rem)] bg-card">
                <div className="p-4 space-y-4 sticky top-12">
                  <div className="space-y-4">
                    <FilterBar onFilterChange={handleFilterChange} />
                    <LocationSelector 
                      currentLocation={currentLocation}
                      onLocationChange={handleLocationChange}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg p-4">
                      <h3 className="font-semibold mb-3 text-foreground">Featured Gig Posters</h3>
                      <div className="space-y-4">
                        {users
                          .filter(user => user.type === "institution")
                          .map(user => (
                            <UserProfile key={user.id} user={user} />
                          ))
                        }
                      </div>
                    </div>
                    
                    <div className="rounded-lg p-4">
                      <h3 className="font-semibold mb-3 text-foreground">How It Works</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="bg-secondary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-secondary-foreground font-medium text-sm">1</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Browse available gigs in your area</p>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-secondary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-secondary-foreground font-medium text-sm">2</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Join with a single click</p>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-secondary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-secondary-foreground font-medium text-sm">3</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Get contacted by the gig poster</p>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-secondary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-secondary-foreground font-medium text-sm">4</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Complete the gig and get paid</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {filteredGigs.length > 0 ? (
                    <div className="space-y-2">
                      {filteredGigs.map(gig => (
                        <GigCard 
                          key={gig.id} 
                          gig={gig} 
                          onApply={handleApplyToGig}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-card border rounded-lg p-8 text-center">
                      <h3 className="text-lg font-medium mb-2 text-foreground">No gigs found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters or check back later for new opportunities.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
