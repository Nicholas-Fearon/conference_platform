import { Space_Grotesk, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata = {
  title: "SummitOS",
  description:
    "Conference platform MVP for organisers, attendees, networking, and post-event community."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body
        className="min-h-screen"
        style={{
          fontFamily: "var(--font-body)"
        }}
      >
        {children}
      </body>
    </html>
  );
}
