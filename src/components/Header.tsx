
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, User } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateGigForm from "./CreateGigForm";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 h-12 bg-[#1A1F2C] z-10 border-b border-[#343536]">
      <div className="h-full flex items-center px-4 gap-4">
        <h1 className="text-xl font-bold text-white whitespace-nowrap flex items-center gap-1">
          GigGrab<span className="text-gig-purple">Hub</span>
        </h1>

        <div className="flex-1 max-w-[600px]">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for gigs..."
              className="w-full h-8 pl-8 pr-4 bg-[#272729] border border-[#343536] rounded-full text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#343536] focus:bg-black hover:bg-[#1A1A1A] hover:border-[#D7DADC]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="h-7 text-sm flex items-center gap-1 bg-gig-purple hover:bg-gig-dark-purple border-0 text-white rounded-full px-4"
              >
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
              className="h-8 rounded-full p-1 hover:bg-[#272729]"
              onClick={() => setIsLoggedIn(false)}
            >
              <div className="bg-[#272729] rounded-full p-1">
                <User className="h-5 w-5 text-gray-200" />
              </div>
            </Button>
          ) : (
            <Button 
              className="h-7 text-sm bg-gig-purple hover:bg-gig-dark-purple rounded-full"
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
