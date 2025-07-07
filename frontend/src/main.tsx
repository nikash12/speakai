import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router.tsx'
import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from "@/providers/theme-provider"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
    </ThemeProvider>
  </StrictMode>
)
