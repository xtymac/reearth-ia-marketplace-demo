import React from "react";
import { cn } from "../../lib/utils";

const badgeVariants = {
  default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline: "text-foreground",
  widget: "bg-[#FFB347] text-white border-transparent", // orange/amber
  storyblock: "bg-[#6FCF97] text-white border-transparent", // green
  infoboxblock: "bg-[#4FA3FF] text-white border-transparent", // blue
  visualizer: "bg-[#FF6F6F] text-white border-transparent", // visualizer red
};

function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant] || badgeVariants.default,
        className
      )}
      {...props}
    />
  );
}

export { Badge }; 