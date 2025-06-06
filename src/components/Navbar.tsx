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
  X,
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
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                : "text-gray-700 hover:text-blue-700 hover:bg-blue-50",
              mobile ? "w-full" : "",
            )}
          >
            <Icon className="h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-blue-50"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full bg-white">
                  <div className="flex items-center justify-between p-6 border-b border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-lg text-gray-900">
                          Immigration Portal
                        </span>
                        <p className="text-sm text-blue-600">
                          Your Path to Canada
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-blue-50"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex-1 p-6">
                    <div className="space-y-2">
                      <NavItems mobile />
                    </div>
                  </nav>
                  <div className="p-6 border-t border-blue-100">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <Link to="/login" className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-gray-900">
                  Immigration Portal
                </span>
                <p className="text-xs text-blue-600 font-medium">
                  Your Path to Canada
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <NavItems />
          </nav>

          {/* User menu */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Link to="/login" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
