// src/app/layout.tsx
import "./globals.css";
import { UserAgentProvider } from "@/components/providers/userAgentProvider";
import { UserAgent } from "@/views/userAgent/index";
import { ReactNode } from "react";
import { headers } from "next/headers"; 

const Layout = ({ children, userAgent }: { children: ReactNode; userAgent: string | undefined }) => {
  return (
    <UserAgentProvider userAgent={userAgent}>
      {children}
      <UserAgent userAgent={userAgent} />
    </UserAgentProvider>
  );
};


export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
 
  const userAgent = headers().get('user-agent') || "No user agent";

  return (
    <html lang="en">
      <body>
        <Layout userAgent={userAgent}>{children}</Layout>
      </body>
    </html>
  );
}
