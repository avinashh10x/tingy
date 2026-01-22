"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/components/ThemeProvider";

export function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
      theme={theme}
    />
  );
}
