"use client";

import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("detran_admin_token");
      if (!token && pathname !== "/auth/sign-in") {
        router.push("/auth/sign-in");
      }
    }
  }, [pathname, router]);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>Detran - Painel Administrativo</title>
        <meta name="description" content="Sistema de gestão do Detran" />
      </head>
      <body>
        <Providers>
          <NextTopLoader showSpinner={false} />

          {pathname.startsWith("/auth") ? (
            <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
              {children}
            </main>
          ) : (
            <div className="flex min-h-screen">
              <Sidebar />

              <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                <Header />

                <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                  {children}
                </main>
              </div>
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}
