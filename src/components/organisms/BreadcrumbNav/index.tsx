"use client";

import * as React from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";

export type Crumb = { title: string; href?: string };

type BreadcrumbNavProps = {
  items: Crumb[];
  showHome?: boolean;
  homeHref?: string;
  className?: string;
};

export function BreadcrumbNav({
  items,
  showHome = true,
  homeHref = process.env.NEXT_PUBLIC_CENTRAL_BASE_URL || "/",
  className,
}: BreadcrumbNavProps) {
  if (!items?.length && !showHome) return null;

  return (
    <div
      className={`border-b border-gray-200 dark:border-white/10 bg-card/20 backdrop-blur-xs px-6 py-4 ${
        className || ""
      }`}
    >
      <Breadcrumb>
        <BreadcrumbList className="text-sm">
          {showHome && (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <a
                  href={homeHref}
                  className="flex items-center gap-2 hover:text-primary transition-colors font-medium"
                >
                  <Home className="w-4 h-4" />
                </a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <div
                key={`${item.title}-${idx}`}
                className="flex items-center gap-2"
              >
                {(showHome || idx > 0) && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4" />
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage className="font-bold">
                      {item.title}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className="hover:text-primary transition-colors font-medium"
                      >
                        {item.title}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
