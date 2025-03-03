import "./globals.css";

export const metadata = {
  title: "VirtualOS",
  description: "A virtual operating system built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
