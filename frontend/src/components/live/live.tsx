import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Navbar from "../layout/navbar/Navbar"
import QuestionSection from "./questionSection"

export default function Live() {
  return (
    <main>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border md:min-w-[100vw] min-h-[100vh]"
      >
        <ResizablePanel defaultSize={20} minSize={20} maxSize={40}>
          <aside className="flex h-full bg-amber-200 items-center justify-center p-6">
            <h2 className="text-lg font-semibold">One</h2>
          </aside>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={50} minSize={30} maxSize={60}>
              <section className="m-10 bg-amber-200">
                <QuestionSection />
              </section>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={50}>
              <section className="flex h-full items-center justify-center p-6 bg-red-400">
                <h2 className="text-lg font-semibold">Three</h2>
              </section>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}
