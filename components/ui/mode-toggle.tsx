"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

// TODO: animation
export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() =>
        setTheme(
          theme === "light" ? "dark" : "light",
          // theme === "light" ? "bottom" : "top",
        )
      }
      size="sm"
      className="cursor-pointer"
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
