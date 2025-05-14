import "./globals.css";

export const metadata = {
  title: 'Virtual OS',
  description: 'A virtual operating system in the browser',
  manifest: '/manifest.json', // Links to your manifest file
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    title: 'Virtual OS',
    statusBarStyle: 'black-translucent',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
