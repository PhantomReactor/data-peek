import { AppSidebar } from './components/app-sidebar'
import { NavActions } from './components/nav-actions'
import { ThemeProvider } from './components/theme-provider'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from './components/ui/breadcrumb'
import { Separator } from './components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './components/ui/sidebar'

function App(): React.JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="data-peek-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="titlebar-drag-region flex h-14 shrink-0 items-center gap-2 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger className="titlebar-no-drag" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1 text-sm font-medium">
                      Project Management & Task Tracking
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="titlebar-no-drag ml-auto px-3">
              <NavActions />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 px-4 py-10">
            <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl shadow-sm" />
            <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl shadow-sm" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
