import "./globals.css"; // This imports the CSS you shared
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "REMO Travels",
  description: "Book your dream journey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* This "children" is where your HomePage (page.jsx) will show up */}
        {children}
      </body>
    </html>
  );
}