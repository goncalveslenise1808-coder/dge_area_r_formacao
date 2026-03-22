import React from 'react';
import { cn } from '@/lib/utils';

interface CardGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradient?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  hover?: boolean;
}

export function CardGradient({ 
  children, 
  className, 
  gradient,
  hover = false,
  ...props 
}: CardGradientProps) {
  const gradientClasses = {
    primary: 'bg-gradient-primary',
    secondary: 'bg-gradient-secondary', 
    tertiary: 'bg-gradient-tertiary',
    quaternary: 'bg-gradient-quaternary'
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 dark:border-white/10 bg-card text-card-foreground transition-smooth",
        gradient && gradientClasses[gradient],
        hover && "card-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}