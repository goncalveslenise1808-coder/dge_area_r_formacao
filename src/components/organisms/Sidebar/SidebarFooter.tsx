'use client';
import { cn } from '@/lib/utils';

export function SidebarFooter({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className="p-4 border-t border-white/5 dark:border-white/10">
      <div className={cn(
        "text-xs text-muted-foreground text-center",
        isCollapsed && "hidden"
      )}>
        <p>Krê+ Portal v2.0</p>
        <p>© 2025 Todos os direitos reservados</p>
      </div>
    </div>
  );
}
