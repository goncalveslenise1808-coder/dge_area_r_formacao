'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from "next/link";

export function SidebarHeader({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className={cn(
      "px-6 h-16 border-b border-gray-200 dark:border-white/10 flex items-center",
    )}>
      <div className="flex items-center gap-3">
        
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className='flex items-center gap-3'
            >
                <Link
                    href={'https://dge-central-base.vercel.app/'}
                >
                    <Image src="/assets/logo.svg" alt="Logo" width={100} height={32} className='object-contain' />
                </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
