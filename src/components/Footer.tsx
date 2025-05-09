
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gig-purple">
              do<span className="text-gig-dark-purple">zyo</span>
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Connecting local gig posters with seekers.
            </p>
          </div>
          
          <div className="flex space-x-8">
            <div>
              <h3 className="font-medium text-sm text-gray-900 mb-2">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gig-purple">Browse Gigs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gig-purple">Post a Gig</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gig-purple">How it Works</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-sm text-gray-900 mb-2">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gig-purple">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gig-purple">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gig-purple">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} dozyo. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gig-purple">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
