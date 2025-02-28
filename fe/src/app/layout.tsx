"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DefaultSidebar } from "@/components/layout/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            router.push("/login");
        }
    }, []);

    const noLayoutPages = useMemo(() => ["/login"], []);

    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>My App</title>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} flex`}>
        {noLayoutPages.includes(pathname) ? (
            children
        ) : (
            <>
                <DefaultSidebar />
                <main className="bg-white flex justify-center w-full">{children}</main>
            </>
        )}
        </body>
        </html>
    );
}