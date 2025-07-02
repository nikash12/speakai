import { ModeToggle } from "@/components/mode-toggle"
import NavigationMenuDemo from "./NavigationMenu"

export default function Navbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          SpeakAI
        </h1>
        <NavigationMenuDemo />
        <ModeToggle/>
      </div>
    </header>
  )
}
