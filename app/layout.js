import "./globals.css";

export const metadata = {
  title: 'Virtual OS',
  description: 'A virtual operating system in the browser',
  manifest: '/manifest.json', // Links to your manifest file
  appleWebApp: {
    capable: true,
    title: 'Virtual OS',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport = {
  themeColor: '#000000',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
