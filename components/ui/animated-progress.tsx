
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export default function AnimatedProgress({
  value,
  className,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <>
      <style>
        {`
        @keyframes progress {
          to {
            left: calc(100% - 2rem);
          }
        }
        .progress {
          transform-origin: center;
          animation: progress 1.25s ease-in-out infinite;
        }
        `}
      </style>
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="relative h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        >
          <div className="progress absolute inset-y-0 left-0 h-full w-6 bg-primary-foreground blur-[10px]" />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </>
  );
}

