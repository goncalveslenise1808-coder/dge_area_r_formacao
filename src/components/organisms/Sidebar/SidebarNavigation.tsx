'use client';
import { SidebarGroup, SidebarMenu, SidebarMenuItem } from '@/components/atoms/sidebar';
import { TooltipProvider } from '@/components/atoms/tooltip';
import { SidebarMenuItemComponent } from './SidebarMenuItem';
import { ScrollArea } from '@/components/atoms/scroll-area';

export function SidebarNavigation({
  menu,
  isCollapsed,
  openItems,
  toggleItem,
  pathname,
  initialProfileKey,
}: {
  menu: any[];
  isCollapsed: boolean;
  openItems: string[];
  toggleItem: (title: string) => void;
  pathname: string;
  initialProfileKey?: string;
}) {
  return (
    <ScrollArea className="flex-1 px-2 ">
      <TooltipProvider>
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            {menu.map((item) => (
              <SidebarMenuItem key={item.title} className=''>
                <SidebarMenuItemComponent
                  item={item}
                  isCollapsed={isCollapsed}
                  openItems={openItems}
                  toggleItem={toggleItem}
                  pathname={pathname}
                  initialProfileKey={initialProfileKey}
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </TooltipProvider>
    </ScrollArea>
  );
}
