import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// homepage | forms | dashboard | about | contact
const routes = [
  { title: "Home", path: "/", dataTestId: "home-page" },
  { title: "Forms", path: "/forms", dataTestId: "forms-page" },
  { title: "Dashboard", path: "/dashboard", dataTestId: "dashboard-page" },
  { title: "About", path: "/about", dataTestId: "about-page" },
  { title: "Contact", path: "/contact", dataTestId: "contact-page" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <ul className="flex space-x-4" data-testid="nav-links">
              {routes.map(({ title, path, dataTestId }) => (
                <Link
                  key={path}
                  href={path}
                  data-testid={dataTestId}
                  className="text-white"
                >
                  <li key={path}>{title}</li>
                </Link>
              ))}
            </ul>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
