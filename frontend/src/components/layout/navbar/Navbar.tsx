import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import NavigationMenuDemo from "./NavigationMenu";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b bg-background p-1">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          SpeakAI
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <div>
            <NavigationMenuDemo />
            
          </div>
          <div>
            <ModeToggle />
            
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <NavigationMenuDemo />
        </div>
      )}
    </header>
  );
}
