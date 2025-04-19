
import {
  Home,
  TrendingUp,
  Compass,
  Grid,
  Plus,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: TrendingUp, label: "Popular", href: "/popular" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: Grid, label: "All", href: "/all" },
];

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleSection = ({ title, children }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 rounded-md"
      >
        <span className="uppercase text-xs font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isOpen && children}
    </div>
  );
};

export function AppSidebar() {
  return (
    <Sidebar className="bg-[#1A1F2C] border-r border-[#343536] w-60">
      <SidebarContent>
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white"
              >
                <a href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <CollapsibleSection title="Custom Feeds">
          <div className="space-y-1 px-2">
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md">
              <Plus className="h-4 w-4" />
              <span>Create a custom feed</span>
            </button>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Communities">
          <div className="space-y-1 px-2">
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md">
              <Plus className="h-4 w-4" />
              <span>Create a community</span>
            </button>
          </div>
        </CollapsibleSection>
      </SidebarContent>
    </Sidebar>
  );
}
