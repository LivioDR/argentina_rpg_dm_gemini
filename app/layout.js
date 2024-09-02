import { Press_Start_2P } from "next/font/google";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"]});

export const metadata = {
  title: "TermoArgenta RPG",
  description: "A customized dungeon master to run your TermoArgenta campaigns, with cloud storage and generative-AI capabilities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>TermoArgenta RPG</title>
        <meta name="title" content="TermoArgenta RPG" />
        <meta name="description" content="TermoArgenta RPG is an AI-powered game where you can interact in real-time with a customized Dungeon Master that will guide you through your campaigns." />
        {/* FACEBOOK */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://termoargentarpg.vercel.app/" />
        <meta property="og:title" content="TermoArgenta RPG" />
        <meta property="og:description" content="TermoArgenta RPG is an AI-powered game where you can interact in real-time with a customized Dungeon Master that will guide you through your campaigns." />
        <meta property="og:image" content="https://termoargentarpg.vercel.app/background.jpg" />
        {/* TWITTER */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://termoargentarpg.vercel.app/" />
        <meta property="twitter:title" content="TermoArgenta RPG" />
        <meta property="twitter:description" content="TermoArgenta RPG is an AI-powered game where you can interact in real-time with a customized Dungeon Master that will guide you through your campaigns." />
        <meta property="twitter:image" content="https://termoargentarpg.vercel.app/background.jpg" />
      </Head>
      <SpeedInsights/>
      <body className={pressStart.className}>{children}</body>
    </html>
  );
}
