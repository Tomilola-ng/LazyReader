"use client";

import { useState, useEffect } from "react";

import { useTheme } from "next-themes";

import { CircleIcon, MoonIcon, SunMediumIcon } from "lucide-react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <CircleIcon />;

  if (resolvedTheme === "dark") {
    return <SunMediumIcon onClick={() => setTheme("light")} />;
  }

  if (resolvedTheme === "light") {
    return <MoonIcon onClick={() => setTheme("dark")} />;
  }
}
