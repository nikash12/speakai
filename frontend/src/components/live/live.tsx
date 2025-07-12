import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import QuestionSection from "./questionSection"
import InputSection from "./inputSection"
import { useRecoilState } from "recoil"
import { indexSchema } from "@/recoil"
import InfoSection from "./infoSection"

export default function Live() {
  const [currIndex,setCurrIndex] = useRecoilState(indexSchema)
  return (
    <main>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border md:min-w-[100vw] min-h-[100vh]"
      >
        <ResizablePanel defaultSize={20} minSize={20} maxSize={40}>
          <InfoSection/>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={40} minSize={30} maxSize={60}>
              
                <QuestionSection />
              
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel >
              <InputSection />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}
