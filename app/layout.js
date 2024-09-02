import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"]});

export const metadata = {
  title: "TermoArgenta RPG",
  description: "A customized dungeon master to run your TermoArgenta campaigns, with cloud storage and generative-AI capabilities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pressStart.className}>{children}</body>
    </html>
  );
}
