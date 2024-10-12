import localFont from "next/font/local";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'
import Head from "next/head";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Explore the Beauty of Mahwa – Your Local Gallery Hub",
  description:
    "Discover Mahwa, Rajasthan through user-contributed images and photos. Upload your own pictures and explore Mahwa’s cultural heritage, scenic landscapes, and local festivals like Dussehra, Navratri, and Diwali. Celebrate Mahwa's vibrant culture with us! | महवा, राजस्थान के चित्रों और छवियों का अन्वेषण करें। अपनी तस्वीरें अपलोड करें और महवा की सांस्कृतिक धरोहर, प्राकृतिक दृश्य और स्थानीय त्योहारों जैसे दशहरा, नवरात्रि और दीवाली का आनंद लें।",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "icon",
      url: "/favicon.ico",
    },
  },
  keywords: [
    // English keywords
    "Mahwa gallery",
    "Mahwa Rajasthan",
    "Mahwa images",
    "Dausa district pictures",
    "Upload Mahwa photos",
    "Rajasthan cultural gallery",
    "Dussehra Mahwa",
    "Navratri Mahwa",
    "Diwali Mahwa",
    "Mahwa festivals",
    "Rajasthan Dussehra festival",
    "Rajasthan Navratri celebration",
    "Rajasthan Diwali",
    "Mahwa culture",
    "Mahwa local festivals",

    // Hindi keywords
    "महवा गैलरी",
    "महवा राजस्थान",
    "महवा चित्र",
    "दौसा जिला चित्र",
    "महवा फ़ोटो अपलोड करें",
    "राजस्थान सांस्कृतिक गैलरी",
    "दशहरा महवा",
    "नवरात्रि महवा",
    "दीवाली महवा",
    "महवा त्योहार",
    "राजस्थान दशहरा महोत्सव",
    "राजस्थान नवरात्रि उत्सव",
    "राजस्थान दीवाली",
    "महवा संस्कृति",
    "महवा स्थानीय त्योहार",
  ],
  // openGraph: {
  //   title: "Explore Mahwa - A Visual Journey",
  //   description:
  //     "A gallery of Mahwa's culture, landscapes, and festivals like Dussehra, Navratri, and Diwali, through images uploaded by locals and visitors.",
  //   url: "https://yourwebsite.com",
  //   siteName: "Mahwa City Gallery",
  //   images: [
  //     {
  //       url: "/og-image.png",  
  //       width: 800,
  //       height: 600,
  //       alt: "Mahwa city scenic view during festival season",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

      </Head>
      <GoogleTagManager gtmId="G-S846W14D0V" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

      </body>
    </html>
  );
}
