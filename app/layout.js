import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TermoArgenta RPG",
  description: "A customized dungeon master to run your TermoArgenta campaigns, with cloud storage and generative-AI capabilities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
