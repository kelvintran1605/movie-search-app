import * as React from "react";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className="relative flex items-center">
      <SearchIcon className="pointer-events-none absolute left-3 text-lg text-white" />

      <input
        type={type}
        data-slot="input"
        className={cn(
          "bg-gray-400/20 h-8 w-full min-w-0 rounded-3xl border border-gray-200/20 px-9 py-2 text-sm md:text-sm",
          "text-[#E5E7EB] placeholder:text-[#9CA3AF]",
          "shadow-sm outline-none transition-[color,box-shadow,border-color]",
          "focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
