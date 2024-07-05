
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";



export const metadata = {
  title: "DressMeUp",
  description: "DressMeUp is a Platform where you can Try costumes and dresses instantly without changing clothes. Our platform uses cutting-edge technology to let you visualize yourself in various outfits, saving time and enhancing your shopping experience",
  icons: {
    icon: [
      { url: '/icon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
        <meta name="google-site-verification" content="vMeZCAopXXa2mFglipcO1IqdC4QAN8lZzybOaUbibl8" />
        <script src="https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js"></script>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-SWE283609G"
            strategy="afterInteractive"
          />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SWE283609G');
            `}
        </Script>
        </Head>
        <body>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
