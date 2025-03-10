import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import MantineWrapper from "./MantineWrapper";
import { Providers } from "./providers";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ProductPouch",
  description: "Created By Sudipta Mandal -> mr.mandal16@gmail.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <MantineWrapper>{children}</MantineWrapper>
        </Providers>
      </body>
    </html>
  );
}
