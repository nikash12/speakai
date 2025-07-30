import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
// import { useRecoilState } from "recoil"
// import { indexSchema } from "@/recoil"
import InfoSection from "./infoSection"
import ChatSession from "./ChatSession"

export default function Dynamic() {
  // const [currIndex,setCurrIndex] = useRecoilState(indexSchema)
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

        <ResizablePanel className="">
          <ResizablePanelGroup direction="vertical" className="h-100vh">
            <ChatSession/>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}
