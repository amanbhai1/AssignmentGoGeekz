import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Home,
  FileText,
  Calculator,
  Upload,
  Folder,
  CheckSquare,
  LogOut,
  User,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Immigration File", href: "/immigration-file", icon: FileText },
  { name: "CRS Score", href: "/crs-score", icon: Calculator },
  { name: "Document Upload", href: "/document-upload", icon: Upload },
  { name: "Application Category", href: "/application-category", icon: Folder },
  { name: "Checklist", href: "/checklist", icon: CheckSquare },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => mobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800",
              mobile ? "w-full" : "",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="border-b bg-white dark:bg-gray-900">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-2 px-3 py-2">
                  <User className="h-8 w-8 text-blue-600" />
                  <span className="font-semibold text-lg">
                    Immigration Portal
                  </span>
                </div>
                <nav className="flex flex-col gap-1">
                  <NavItems mobile />
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <User className="h-8 w-8 text-blue-600" />
            <span className="font-semibold text-lg hidden sm:block">
              Immigration Portal
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex ml-8 gap-1">
          <NavItems />
        </nav>

        {/* User menu */}
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
