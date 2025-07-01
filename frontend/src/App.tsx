import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
        <Button>Click Me</Button>
        <ModeToggle />
      </div>
    </ThemeProvider>
  )
}

export default App
