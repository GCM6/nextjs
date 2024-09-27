"use client"

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

interface ProvidersProps extends ThemeProviderProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}


    export function Providers({ children, ...props }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class" {...props}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}