import "./globals.css";
import type { Metadata } from "next";
import { DefaultTemplateString } from "next/dist/lib/metadata/types/metadata-types";
import { Inter } from "next/font/google";
import Head from "next/head";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend",
  description: "Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Frontend</title>
        <meta
          property="og:title"
          content={metadata.title! as string}
          key="title"
        />
        <meta
          property="og:description"
          content={metadata.description!}
          key="description"
        />
      </Head>
      <body className={inter.className} data-theme="cupcake">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
