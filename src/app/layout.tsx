import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { SiteShell } from "@/components/site/site-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumierebeauty.example.com"),
  title: {
    default: "Lumière Lounge",
    template: "%s — Lumière Lounge",
  },
  description:
    "Lumière Beauty Lounge is a modern women's salon in Hayes Valley, San Francisco offering expert hair, skin, makeup, bridal, spa and nail services. Book your appointment with our certified stylists today.",
  keywords: [
    "women's salon San Francisco",
    "hair salon Hayes Valley",
    "bridal makeup SF",
    "facial spa",
    "hair coloring",
    "manicure",
    "balayage San Francisco",
    "beauty lounge",
    "Lumière salon",
  ],
  authors: [{ name: "Lumière Beauty Lounge" }],
  openGraph: {
    title: "Lumière Beauty Lounge — Premier Women's Salon & Spa",
    description:
      "Expert hair, skin, makeup, bridal, spa & nail services by certified stylists in Hayes Valley, SF. Book your appointment today.",
    siteName: "Lumière Beauty Lounge",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumière Beauty Lounge — Premier Women's Salon & Spa",
    description:
      "Expert hair, skin, makeup, bridal, spa & nail services by certified stylists in Hayes Valley, SF.",
  },
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SiteShell>{children}</SiteShell>
        <Toaster />
        <SonnerToaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
