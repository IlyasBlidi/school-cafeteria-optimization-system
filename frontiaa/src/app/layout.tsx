// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NotificationProvider } from "@/Contexts/NotificationContext";
import NotificationComponent from "@/components/notificationComponent";

export const metadata: Metadata = {
  title: "Wufu :)",
  description: "Cafeteria being digitalized!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@200,201,300,301,400,401,500,501,600,601,700,701&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NotificationProvider>
          <NotificationComponent />
          {children}
          <Toaster />
        </NotificationProvider>
      </body>
    </html>
  );
}