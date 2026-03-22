"use client";

import * as React from "react";

export function Info({
  icon,
  label,
}: {
  icon?: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon ? <span className="text-muted-foreground">{icon}</span> : null}
      <span className="leading-snug">{label}</span>
    </div>
  );
}
