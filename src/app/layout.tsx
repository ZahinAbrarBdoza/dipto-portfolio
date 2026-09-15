import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

import { Cursor } from "@/components/providers/Cursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ThemeProvider, themeScript } from "@/components/providers/ThemeProvider";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { Preloader } from "@/components/layout/Preloader";
import { profile, socials } from "@/data/profile";

const sans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const title = `${profile.fullName} — ${profile.role}`;
const description = `${profile.fullName} is a ${profile.role.toLowerCase()} in ${profile.location}. ${profile.specialization}.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.fullName}`,
  },
  description,
  applicationName: profile.fullName,
  authors: [{ name: profile.fullName, url: profile.siteUrl }],
  creator: profile.fullName,
  keywords: [
    profile.fullName,
    profile.name,
    "data analyst",
    "automation engineer",
    "MIS",
    "SQL",
    "Python",
    "Looker Studio",
    "data analytics portfolio",
    profile.location,
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: profile.siteUrl,
    siteName: profile.fullName,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
  category: "design",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090C" },
    { media: "(prefers-color-scheme: light)", color: "#F1EEE8" },
  ],
};

/** Person + Website structured data, built from the same profile file. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${profile.siteUrl}/#person`,
      name: profile.fullName,
      alternateName: profile.name,
      jobTitle: profile.role,
      description: profile.specialization,
      email: `mailto:${profile.email}`,
      url: profile.siteUrl,
      address: { "@type": "PostalAddress", addressLocality: profile.location },
      sameAs: socials.map((social) => social.href),
      knowsAbout: [
        "Data analysis",
        "SQL",
        "Python",
        "Workflow automation",
        "Management information systems",
        "Data visualisation",
      ],
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "University of Dhaka" },
        { "@type": "CollegeOrUniversity", name: "BRAC University" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${profile.siteUrl}/#website`,
      url: profile.siteUrl,
      name: title,
      description,
      publisher: { "@id": `${profile.siteUrl}/#person` },
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable}`}>
      <head>
        {/* Stamps the stored theme before first paint — no palette flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Without JS the motion layer never resolves — reveal everything it
            would have animated in, and drop the preloader entirely. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>#preloader{display:none!important}" +
              '[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;clip-path:none!important}' +
              "</style>",
          }}
        />
      </head>
      <body className="min-h-svh antialiased">
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>

          <Preloader />
          <SmoothScroll />
          <Cursor />
          <Nav />

          {/* tabIndex -1 so the skip link actually moves focus in WebKit,
              which will not focus a non-focusable fragment target. */}
          <main id="main" tabIndex={-1}>
            {children}
          </main>

          <Footer />

          <div className="grain" aria-hidden />
        </ThemeProvider>
      </body>
    </html>
  );
}
