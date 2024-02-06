import type { Metadata } from "next";
import Nav from "@/components/Nav";
import {Toaster} from "@/components/ui/toaster";



export const metadata: Metadata = {
  title: "Vogue Visit",
  description: "Salon Appointment Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ backgroundSize:'cover'}} className={""}>
      {/*<Nav/>*/}
      {children}
      <Toaster />
    </div>


  );
}
