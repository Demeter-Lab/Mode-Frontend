import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ModePad",
  description:
    "We offer a streamlined launchpad and IDO platform, empowering token projects to reach their full potential.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body suppressHydrationWarning={true} className={inter.className}>
        {children}
      </body>
    </html>
  );
}
