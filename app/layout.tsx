"use client"; 

import localFont from "next/font/local";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import { WishlistProvider } from "./context/wishlist";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Tecgen Movie web</title>
        <meta name="description" content="Tecgen Movie App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WishlistProvider>
        <QueryClientProvider client={queryClient}>
        <Header/>
          {children}
        </QueryClientProvider>
        </WishlistProvider>
       
      </body>
    </html>
  );
}
