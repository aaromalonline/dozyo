
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, User, History, MessageCircle, Compass, Info, Menu } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateGigForm from "./CreateGigForm";
import { useSidebar } from "@/components/ui/sidebar";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 h-14 bg-[#1A1A1A] z-10 border-b border-[#343536] w-full flex-shrink-0">
      <div className="h-full px-4 w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-300 hover:text-white hover:bg-[#272729]"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-white whitespace-nowrap flex items-center gap-1 min-w-[80px] flex-shrink-0">
            do<span className="text-gig-purple">zyo</span>
          </h1>
        </div>

        <div className="flex-1 max-w-[500px] px-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for gigs..."
              className="w-full h-8 pl-9 pr-4 bg-[#272729] border border-[#343536] rounded-full text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#343536] focus:bg-black hover:bg-[#1A1A1A] hover:border-[#D7DADC]"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <nav className="hidden md:flex items-center gap-4 flex-shrink-0">
            {isLoggedIn && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-300 hover:text-white hover:bg-[#272729]"
                >
                  <History className="mr-1 h-3.5 w-3.5" />
                  History
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-300 hover:text-white hover:bg-[#272729]"
                >
                  <MessageCircle className="mr-1 h-3.5 w-3.5" />
                  Chats
                </Button>
              </>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-300 hover:text-white hover:bg-[#272729]"
            >
              <Compass className="mr-1 h-3.5 w-3.5" />
              Explore
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-300 hover:text-white hover:bg-[#272729]"
            >
              <Info className="mr-1 h-3.5 w-3.5" />
              About
            </Button>
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            {isLoggedIn ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs flex items-center gap-1 bg-gig-purple hover:bg-gig-dark-purple border-0 text-white rounded-full px-3"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] bg-[#1A1A1A] border-[#343536]">
                    <CreateGigForm />
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="ghost" 
                  className="rounded-full p-1 hover:bg-[#272729]"
                  onClick={() => setIsLoggedIn(false)}
                >
                  <div className="bg-[#272729] rounded-full p-0.5">
                    <User className="h-5 w-5 text-gray-200" />
                  </div>
                </Button>
              </>
            ) : (
              <Button 
                className="h-7 text-xs bg-gig-purple hover:bg-gig-dark-purple rounded-full"
                onClick={() => setIsLoggedIn(true)}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
