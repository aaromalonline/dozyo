
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, User } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateGigForm from "./CreateGigForm";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 h-12 bg-dark-background border-b border-dark-border z-10">
      <div className="h-full flex items-center px-4 gap-4">
        <h1 className="text-xl font-bold text-gig-purple whitespace-nowrap">
          GigGrab<span className="text-gig-dark-purple">Hub</span>
        </h1>

        <div className="flex-1 max-w-[600px]">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for gigs..."
              className="w-full h-8 pl-8 pr-4 bg-dark-muted border border-dark-border rounded-md text-sm text-white focus:outline-none focus:ring-1 focus:ring-gig-purple"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-7 text-sm flex items-center gap-1 border-gig-purple text-gig-purple hover:bg-gig-light-purple">
                <PlusCircle className="h-4 w-4" />
                Post Gig
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <CreateGigForm />
            </DialogContent>
          </Dialog>

          {isLoggedIn ? (
            <Button 
              variant="ghost" 
              className="h-7 rounded-full p-1"
              onClick={() => setIsLoggedIn(false)}
            >
              <div className="bg-gig-light-purple rounded-full p-1">
                <User className="h-4 w-4 text-gig-purple" />
              </div>
            </Button>
          ) : (
            <Button 
              className="h-7 text-sm bg-gig-purple hover:bg-gig-dark-purple"
              onClick={() => setIsLoggedIn(true)}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
