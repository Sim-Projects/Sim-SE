import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Image from "next/image";
// import { Separator } from "@radix-ui/react-separator";
// import { Separator } from "@/components/ui/separator";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIM-SE",
  description: "Let's learn Engineering!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <div className="flex items-center justify-center py-2 sticky bg-white shadow-md">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
          <div className="ml-4 text-1xl font-bold">
            Let&apos;s learn Engineering!
          </div>
        </div>
        {/* <Separator className="mt-8" /> */}
        {children}
      </body>
    </html>
  );
}
