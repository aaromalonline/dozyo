
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, User } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateGigForm from "./CreateGigForm";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
      <div className="container mx-auto py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gig-purple">
            GigGrab<span className="text-gig-dark-purple">Hub</span>
          </h1>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for gigs..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gig-purple focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1 border-gig-purple text-gig-purple hover:bg-gig-light-purple">
                <PlusCircle className="h-4 w-4" />
                <span>Post Gig</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <CreateGigForm />
            </DialogContent>
          </Dialog>

          {isLoggedIn ? (
            <Button 
              variant="ghost" 
              className="rounded-full p-2"
              onClick={() => setIsLoggedIn(false)}
            >
              <div className="bg-gig-light-purple rounded-full p-1">
                <User className="h-5 w-5 text-gig-purple" />
              </div>
            </Button>
          ) : (
            <Button 
              className="bg-gig-purple hover:bg-gig-dark-purple"
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
