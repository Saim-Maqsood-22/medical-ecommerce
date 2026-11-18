import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Whatsapp from "./components/Whatsapp";
import VoiceControl from "./components/Voice";
import SeasonalHealthAlert from "./components/SeasonalAlerts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "medMagic - Home",
  description: "One stop solution for all your medical needs",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-br from-gray-900 via-[#1a1a1a] to-gray-800 `}
        >
        <Navbar />
        <SeasonalHealthAlert/>
        {children}
        <ChatBot />
        <Whatsapp />
        <VoiceControl />
        <Footer />
        </body>
      </html>
  );
}
