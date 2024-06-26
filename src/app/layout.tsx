import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Flow Games",
    template: "%s | Flow Games",
  },
  description: "Find your dream game.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        <ThemeProvider attribute="class">
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}