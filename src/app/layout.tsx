import type { Metadata } from "next";
import "./app.scss"
import { Work_Sans } from 'next/font/google'

export const metadata: Metadata = {
  title: "Libreria Cybrary",
  description: "Libreria Cybrary",
};

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
