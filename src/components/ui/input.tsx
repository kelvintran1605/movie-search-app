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
      <SearchIcon className="pointer-events-none absolute left-3 text-lg text-gray-500 dark:text-white" />

      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-8 w-full min-w-0 rounded-3xl px-9 py-2 text-sm md:text-sm",
          "bg-white text-black placeholder:text-gray-500",
          "border border-gray-300",
          "shadow-sm outline-none transition-[color,box-shadow,border-color]",
          "focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

          "dark:bg-gray-400/20 dark:text-[#E5E7EB] dark:placeholder:text-[#9CA3AF]",
          "dark:border-gray-200/20",

          className 
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
